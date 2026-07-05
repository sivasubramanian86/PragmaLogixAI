$token = (gcloud auth print-access-token 2>&1)
$uri = "https://cloudbuild.googleapis.com/v1/projects/genai-apac-2026-491004/builds/a1f3fe16-d127-4e79-a556-aa8dc4222b5b"
$headers = @{ Authorization = "Bearer $token" }
$resp = Invoke-RestMethod -Uri $uri -Headers $headers -Method Get
Write-Host "Status: $($resp.status)"
Write-Host "Finish: $($resp.finishTime)"
if ($resp.status -eq "FAILURE" -or $resp.status -eq "SUCCESS") {
    Write-Host "=== Last 20 log lines ==="
    $resp.steps | ForEach-Object { $_.logs | Select-Object -Last 5 | ForEach-Object { Write-Host $_ } }
}
