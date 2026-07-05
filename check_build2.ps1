$token = (gcloud auth print-access-token 2>&1)
$uri = "https://cloudbuild.googleapis.com/v1/projects/genai-apac-2026-491004/builds/a45ad4d4-a4f8-4c6f-9437-98a5f86038f2"
$headers = @{ Authorization = "Bearer $token" }
$resp = Invoke-RestMethod -Uri $uri -Headers $headers -Method Get
Write-Host "Status: $($resp.status)"
Write-Host "Finish: $($resp.finishTime)"
if ($resp.status -eq "FAILURE") {
    Write-Host "=== Failure details ==="
    $resp.steps | ForEach-Object { 
        if ($_.status -eq "FAILURE") {
            Write-Host "Step: $($_.name)"
            $_.timing | ConvertTo-Json
        }
    }
}
