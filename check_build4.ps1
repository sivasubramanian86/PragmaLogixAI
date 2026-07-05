$token = (gcloud auth print-access-token 2>&1)
$uri = "https://cloudbuild.googleapis.com/v1/projects/genai-apac-2026-491004/builds/c31e6590-1138-4bb4-b998-62b49626a4c5"
$headers = @{ Authorization = "Bearer $token" }
$resp = Invoke-RestMethod -Uri $uri -Headers $headers -Method Get
Write-Host "Status: $($resp.status)"
Write-Host "Finish: $($resp.finishTime)"
if ($resp.logsBucket) {
    Write-Host "LogsBucket: $($resp.logsBucket)"
    # Download log
    $logBucket = $resp.logsBucket -replace "gs://", ""
    $token2 = (gcloud auth print-access-token 2>&1)
    $logUri = "https://storage.googleapis.com/storage/v1/b/$logBucket/o/log-c31e6590-1138-4bb4-b998-62b49626a4c5.txt?alt=media"
    try {
        $logs = Invoke-RestMethod -Uri $logUri -Headers @{ Authorization = "Bearer $token2" } -Method Get
        Write-Host "=== BUILD LOG (last 80 lines) ==="
        $logs -split "`n" | Select-Object -Last 80 | ForEach-Object { Write-Host $_ }
    } catch {
        Write-Host "Log download error: $($_.Exception.Message)"
    }
}
