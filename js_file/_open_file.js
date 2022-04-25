

export class Open_file{


  get_file_json = async  ()=> {

  let [fileHandle] = await window.showOpenFilePicker({
  types: [{
  description: 'Text documents',
  accept: {
  'text/json': ['.json'],
  },
  }],
  excludeAcceptAllOption: true,
  });

  let fileData = await fileHandle.getFile();

  let text = await fileData.text()


  let globalJson =  await JSON.parse(text)

  return await  {globalJson , fileHandle}

}
}