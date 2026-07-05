$token = (gcloud auth print-access-token 2>&1)
$uri = "https://cloudbuild.googleapis.com/v1/projects/genai-apac-2026-491004/builds/7c625088-386c-4ba0-a470-d320587194b1"
$headers = @{ Authorization = "Bearer $token" }
$resp = Invoke-RestMethod -Uri $uri -Headers $headers -Method Get
Write-Host "Status: $($resp.status)"
Write-Host "Finish: $($resp.finishTime)"
if ($resp.logsBucket -and ($resp.status -eq "SUCCESS" -or $resp.status -eq "FAILURE")) {
    $logBucket = $resp.logsBucket -replace "gs://", ""
    $token2 = (gcloud auth print-access-token 2>&1)
    $logUri = "https://storage.googleapis.com/storage/v1/b/$logBucket/o/log-7c625088-386c-4ba0-a470-d320587194b1.txt?alt=media"
    try {
        $logs = Invoke-RestMethod -Uri $logUri -Headers @{ Authorization = "Bearer $token2" } -Method Get
        Write-Host "=== BUILD LOG (last 50 lines) ==="
        $logs -split "`n" | Select-Object -Last 50 | ForEach-Object { Write-Host $_ }
    } catch {
        Write-Host "Log download: $($_.Exception.Message)"
    }
}
