$token = (gcloud auth print-access-token 2>&1)
$uri = "https://run.googleapis.com/v2/projects/genai-apac-2026-491004/locations/us-central1/services/pragmalogixai-backend"
$headers = @{ Authorization = "Bearer $token" }
try {
    $resp = Invoke-RestMethod -Uri $uri -Headers $headers -Method Get
    Write-Host "Service URL: $($resp.uri)"
    Write-Host "Latest Revision: $($resp.latestCreatedRevision)"
    Write-Host "Latest Ready: $($resp.latestReadyRevision)"
    # Check conditions
    $resp.conditions | ForEach-Object {
        Write-Host "Condition: $($_.type) = $($_.state) - $($_.message)"
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    # Try listing revisions
    $revUri = "https://run.googleapis.com/v2/projects/genai-apac-2026-491004/locations/us-central1/services/pragmalogixai-backend/revisions"
    try {
        $revResp = Invoke-RestMethod -Uri $revUri -Headers $headers -Method Get
        $revResp.revisions | Select-Object -First 2 | ForEach-Object {
            Write-Host "Revision: $($_.name) - $($_.conditions | Where-Object { $_.type -eq 'Ready' } | Select-Object -ExpandProperty message)"
        }
    } catch {
        Write-Host "Could not list revisions: $($_.Exception.Message)"
    }
}
