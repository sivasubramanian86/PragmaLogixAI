$token = (gcloud auth print-access-token 2>&1)
$headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }

# Try fetching from the cloudbuild log stream
$body = @{
    resourceNames = @("projects/genai-apac-2026-491004")
    filter = 'logName="projects/genai-apac-2026-491004/logs/cloudbuild" labels."build_id"="52e4eb62-8aeb-4b2f-a39b-7f9c0366c985"'
    orderBy = "timestamp asc"
    pageSize = 100
} | ConvertTo-Json

$uri = "https://logging.googleapis.com/v2/entries:list"
$resp = Invoke-RestMethod -Uri $uri -Headers $headers -Method Post -Body $body

Write-Host "Total entries: $($resp.entries.Count)"
$resp.entries | ForEach-Object {
    $msg = if ($_.textPayload) { $_.textPayload } elseif ($_.jsonPayload.message) { $_.jsonPayload.message } else { $_.jsonPayload | ConvertTo-Json -Compress }
    Write-Host $msg
}
