export async function delayedResponse(data, delayMs) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delayMs);
  });
}
