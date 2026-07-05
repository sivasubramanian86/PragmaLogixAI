$token = (gcloud auth print-access-token 2>&1)
$headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }

$addUri = "https://firebase.googleapis.com/v1beta1/projects/genai-apac-2026-491004:addFirebase"
try {
    $resp = Invoke-RestMethod -Uri $addUri -Headers $headers -Method Post -Body "{}"
    Write-Host "Success:"
    $resp | ConvertTo-Json -Depth 5
} catch {
    Write-Host "Status: $($_.Exception.Response.StatusCode)"
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $body = $reader.ReadToEnd()
    Write-Host "Body: $body"
}
