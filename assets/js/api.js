async function submitOrderToWebhook(payload) {
  const webhookUrl = 'https://collar-comrade-backrest.ngrok-free.dev/webhook/Form-fries-order';
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Webhook failed');
  }

  return response;
}
