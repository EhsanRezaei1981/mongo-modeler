export const saveFileModern = async (filename: string, content: string) => {
  try {
    const newFileHandle = await window.showSaveFilePicker({
      suggestedName: filename,
    });
    const writableStream = await newFileHandle.createWritable();
    await writableStream.write(content);
    await writableStream.close();
  } catch (error) {
    throw new Error('Error save file: ' + error);
  }
};
