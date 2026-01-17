import api from '../config/axios';

export const uploadBugAttachment = async (bugId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await api.post(
    `/bugs/${bugId}/attachments`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return res.data;
};

export const getBugAttachments = async (bugId) => {
  const res = await api.get(`/bugs/${bugId}/attachments`);
  return res.data;
};
