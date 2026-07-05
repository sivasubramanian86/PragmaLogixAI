# Add the GCP project to Firebase via the Firebase Management API
$token = (gcloud auth print-access-token 2>&1)
$headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }

# Step 1: Add Firebase to the GCP project
$addUri = "https://firebase.googleapis.com/v1beta1/projects/genai-apac-2026-491004:addFirebase"
try {
    $resp = Invoke-RestMethod -Uri $addUri -Headers $headers -Method Post -Body "{}"
    Write-Host "AddFirebase response:"
    $resp | ConvertTo-Json
} catch {
    $errBody = $_.ErrorDetails.Message
    Write-Host "AddFirebase error: $errBody"
}
