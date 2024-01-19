import FingerprintJS from "@fingerprintjs/fingerprintjs";

// Initialize an agent at application startup.

export const GenerateUniqId = async () => {
  // Get the visitor identifier when you need it.
  const fpPromise = FingerprintJS.load();
  try {
    const fp = await fpPromise;
    const result = await fp.get();

    // This is the visitor identifier:
    const visitorId = result.visitorId;
    return visitorId;
  } catch (err) {
    console.log(err);
  }
};
