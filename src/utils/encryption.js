  const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

  const getKey = async () => {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(ENCRYPTION_KEY).slice(0, 32);
    return await crypto.subtle.importKey('raw', keyData, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
  };

  export const encryptData = async (data) => {
    const key = await getKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(JSON.stringify(data)));
    return btoa(String.fromCharCode.apply(null, new Uint8Array(encryptedData))) + '.' + btoa(String.fromCharCode.apply(null, iv));
  };

  export const decryptData = async (encryptedData) => {
    const [data, iv] = encryptedData.split('.').map(part => Uint8Array.from(atob(part), c => c.charCodeAt(0)));
    const key = await getKey();
    const decryptedData = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
    return JSON.parse(new TextDecoder().decode(decryptedData));
  };
