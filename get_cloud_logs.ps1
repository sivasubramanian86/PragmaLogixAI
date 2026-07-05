$token = (gcloud auth print-access-token 2>&1)
$headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }
$body = @{
    resourceNames = @("projects/genai-apac-2026-491004")
    filter = 'resource.type="build" labels."build_id"="a45ad4d4-a4f8-4c6f-9437-98a5f86038f2" severity>=ERROR'
    orderBy = "timestamp desc"
    pageSize = 20
} | ConvertTo-Json
$uri = "https://logging.googleapis.com/v2/entries:list"
$resp = Invoke-RestMethod -Uri $uri -Headers $headers -Method Post -Body $body
$resp.entries | ForEach-Object {
    Write-Host "[$($_.timestamp)] $($_.textPayload)$($_.jsonPayload.message)"
}
if (-not $resp.entries) {
    Write-Host "No error entries found. Trying broader filter..."
    $body2 = @{
        resourceNames = @("projects/genai-apac-2026-491004")
        filter = 'labels."build_id"="a45ad4d4-a4f8-4c6f-9437-98a5f86038f2"'
        orderBy = "timestamp desc"
        pageSize = 30
    } | ConvertTo-Json
    $resp2 = Invoke-RestMethod -Uri $uri -Headers $headers -Method Post -Body $body2
    $resp2.entries | Select-Object -Last 30 | ForEach-Object {
        Write-Host "[$($_.timestamp)] $($_.textPayload)"
    }
}
