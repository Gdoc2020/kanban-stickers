# GitHub Actions и цифровая подпись Windows

В проекте уже находится workflow `.github/workflows/release.yml`. Он запускает проверки, собирает Windows-установщик, создаёт portable ZIP, проверяет Authenticode-подпись, рассчитывает SHA-256 и публикует GitHub Release при отправке тега `v*`.

## Вариант 1: сертификат OV/EV в PFX

Нужен сертификат Code Signing от доверенного центра сертификации, разрешающий экспорт в `.pfx`. Самоподписанный сертификат подходит только для внутренних тестов и не устраняет предупреждение SmartScreen.

### 1. Подготовка PFX

Экспортируйте сертификат вместе с закрытым ключом в `certificate.pfx`, защитив его отдельным сильным паролем. Если возможно, не включайте в PFX всю цепочку промежуточных сертификатов, чтобы Base64 не превысил лимит переменной Windows.

Получите Base64 в PowerShell:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("certificate.pfx")) | Set-Clipboard
```

Не сохраняйте PFX или Base64 в репозитории.

### 2. GitHub Secrets

В репозитории откройте `Settings → Secrets and variables → Actions → New repository secret` и создайте:

- `WIN_CSC_LINK` — Base64 из предыдущего шага;
- `WIN_CSC_KEY_PASSWORD` — пароль PFX.

Workflow передаёт эти значения Electron Builder. Опция `forceCodeSigning=true` запрещает выпуск неподписанного релиза.

### 3. Пробный запуск

Откройте `Actions → Build, sign and release → Run workflow`. Результат появится в разделе Artifacts, но GitHub Release не будет создан.

### 4. Публикация релиза

Обновите версию в `package.json`, сделайте commit, затем создайте и отправьте тег:

```powershell
git tag v0.1.0
git push origin v0.1.0
```

Workflow автоматически создаст Release и загрузит установщик, portable ZIP и `SHA256SUMS.txt`.

## Вариант 2: Microsoft Artifact Signing

Artifact Signing — облачная служба Microsoft, ранее называвшаяся Trusted Signing. Закрытый ключ хранится в управляемом HSM и не передаётся в GitHub.

Последовательность настройки:

1. Создайте Azure subscription и Microsoft Entra tenant.
2. Зарегистрируйте поставщика ресурсов `Microsoft.CodeSigning`.
3. Создайте Artifact Signing Account.
4. Пройдите Identity Validation и создайте Public Trust Certificate Profile.
5. Создайте App Registration или федеративные credentials GitHub OIDC.
6. Назначьте приложению роль `Artifact Signing Certificate Profile Signer`.
7. Добавьте в `build.win` файла `package.json`:

```json
"azureSignOptions": {
  "publisherName": "точное значение CN сертификата",
  "endpoint": "https://ВАШ-РЕГИОН.codesigning.azure.net/",
  "codeSigningAccountName": "имя аккаунта Artifact Signing",
  "certificateProfileName": "имя профиля сертификата"
}
```

8. Для простой аутентификации service principal добавьте GitHub Secrets `AZURE_TENANT_ID`, `AZURE_CLIENT_ID` и `AZURE_CLIENT_SECRET`, а в шаг сборки передайте их как переменные окружения вместо `WIN_CSC_LINK` и `WIN_CSC_KEY_PASSWORD`.

Artifact Signing с Public Trust доступен не во всех странах. Перед созданием Azure-ресурсов проверьте текущие региональные ограничения Microsoft.

## Проверка готового файла вручную

```powershell
Get-AuthenticodeSignature ".\dist\Kanban-Stickers-Setup-0.1.0-x64.exe" |
  Format-List Status,StatusMessage,SignerCertificate,TimeStamperCertificate
```

Ожидаемый статус — `Valid`. Наличие действительной подписи подтверждает издателя и целостность файла, но новый OV/Artifact Signing сертификат всё равно может некоторое время накапливать репутацию SmartScreen.
