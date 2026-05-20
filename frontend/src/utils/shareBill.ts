export const shareOnWhatsApp = (shareText: string) => {
  const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  window.open(url, "_blank");
};

export const shareViaEmail = (subject: string, shareText: string) => {
  window.location.href = `mailto:?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(shareText)}`;
};

export const nativeShare = async (title: string, text: string) => {
  if (!navigator.share) {
    throw new Error("Sharing not supported");
  }

  await navigator.share({
    title,
    text,
  });
};
