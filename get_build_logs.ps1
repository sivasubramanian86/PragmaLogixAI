$token = (gcloud auth print-access-token 2>&1)
$uri = "https://cloudbuild.googleapis.com/v1/projects/genai-apac-2026-491004/builds/a45ad4d4-a4f8-4c6f-9437-98a5f86038f2"
$headers = @{ Authorization = "Bearer $token" }
$resp = Invoke-RestMethod -Uri $uri -Headers $headers -Method Get
# Get log bucket and object
Write-Host "LogsBucket: $($resp.logsBucket)"
Write-Host "LogUrl: $($resp.logUrl)"
# Download logs from GCS
$logBucket = $resp.logsBucket -replace "gs://", ""
$logObj = "log-a45ad4d4-a4f8-4c6f-9437-98a5f86038f2.txt"
$logUri = "https://storage.googleapis.com/storage/v1/b/$logBucket/o/$logObj`?alt=media"
Write-Host "Fetching: $logUri"
try {
    $logs = Invoke-RestMethod -Uri $logUri -Headers $headers -Method Get
    $logs -split "`n" | Select-Object -Last 60 | ForEach-Object { Write-Host $_ }
} catch {
    Write-Host "Log fetch error: $($_.Exception.Message)"
}
