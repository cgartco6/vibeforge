import JSZip from 'jszip';

export async function generateProjectZIP(projectName: string, files: Record<string, string>) {
  const zip = new JSZip();
  Object.entries(files).forEach(([path, content]) => {
    zip.file(path, content);
  });
  return await zip.generateAsync({ type: 'blob' });
}
