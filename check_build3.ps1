$token = (gcloud auth print-access-token 2>&1)
$uri = "https://cloudbuild.googleapis.com/v1/projects/genai-apac-2026-491004/builds/52e4eb62-8aeb-4b2f-a39b-7f9c0366c985"
$headers = @{ Authorization = "Bearer $token" }
$resp = Invoke-RestMethod -Uri $uri -Headers $headers -Method Get
Write-Host "Status: $($resp.status)"
Write-Host "Finish: $($resp.finishTime)"
