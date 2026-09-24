$ErrorActionPreference = 'Stop'
$assets = 'C:\Users\farri\Documents\Codex\2026-09-24\buat-sebuah-website-portfolio-personal-modern\outputs\iki-portfolio\public\assets'
$fontFiles = @(
  @{Url='https://fonts.gstatic.com/s/dmsans/v17/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu0-K4.woff2'; Name='dm-sans-latin.woff2'},
  @{Url='https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2'; Name='manrope-latin.woff2'},
  @{Url='https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M.woff2'; Name='instrument-serif-italic-latin.woff2'},
  @{Url='https://raw.githubusercontent.com/google/fonts/main/ofl/dmsans/OFL.txt'; Name='LICENSE-DM-Sans.txt'},
  @{Url='https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt'; Name='LICENSE-Manrope.txt'},
  @{Url='https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/OFL.txt'; Name='LICENSE-Instrument-Serif.txt'}
)
foreach ($font in $fontFiles) {
  Invoke-WebRequest -Uri $font.Url -OutFile (Join-Path $assets $font.Name) -TimeoutSec 30
  Write-Output $font.Name
}
