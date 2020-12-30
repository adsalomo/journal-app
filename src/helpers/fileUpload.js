export const fileUpload = async (file) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/doyaue3oy/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        });

        if (!resp.ok) {
            throw await resp.json();
        }

        const respUpload = await resp.json();

        return respUpload.secure_url;

    } catch (e) {
        throw e;
    }

}