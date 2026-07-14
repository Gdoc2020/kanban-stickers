Add-Type -AssemblyName System.Drawing

$size = 256
$bitmap = [System.Drawing.Bitmap]::new($size, $size)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.Clear([System.Drawing.Color]::Transparent)

$path = [System.Drawing.Drawing2D.GraphicsPath]::new()
$radius = 52
$path.AddArc(8, 8, $radius, $radius, 180, 90)
$path.AddArc($size - $radius - 8, 8, $radius, $radius, 270, 90)
$path.AddArc($size - $radius - 8, $size - $radius - 8, $radius, $radius, 0, 90)
$path.AddArc(8, $size - $radius - 8, $radius, $radius, 90, 90)
$path.CloseFigure()
$graphics.FillPath([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(108, 92, 231)), $path)

$graphics.FillRectangle([System.Drawing.SolidBrush]::new([System.Drawing.Color]::White), 48, 54, 62, 148)
$graphics.FillRectangle([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 209, 102)), 132, 54, 76, 62)
$graphics.FillRectangle([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(124, 227, 177)), 132, 138, 76, 64)

$stream = [System.IO.MemoryStream]::new()
$bitmap.Save($stream, [System.Drawing.Imaging.ImageFormat]::Png)
$png = $stream.ToArray()
$output = Join-Path $PSScriptRoot '..\build\icon.ico'
$directory = Split-Path -Parent $output
[System.IO.Directory]::CreateDirectory($directory) | Out-Null
$file = [System.IO.File]::Open($output, [System.IO.FileMode]::Create)
$writer = [System.IO.BinaryWriter]::new($file)
$writer.Write([UInt16]0)
$writer.Write([UInt16]1)
$writer.Write([UInt16]1)
$writer.Write([Byte]0)
$writer.Write([Byte]0)
$writer.Write([Byte]0)
$writer.Write([Byte]0)
$writer.Write([UInt16]1)
$writer.Write([UInt16]32)
$writer.Write([UInt32]$png.Length)
$writer.Write([UInt32]22)
$writer.Write($png)
$writer.Dispose()
$graphics.Dispose()
$bitmap.Dispose()
$stream.Dispose()
Write-Output $output
