const fs = require('fs')
const readline = require('readline')

let enteredSrcDirPathName;
let enteredDstDirPathName;
let fileArray = [];
let inputFileIndexNumber;
let fileSelected;
let fullFileSelectedPath;

//Creating interface reference of readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let getSrcDirName = () =>{

    rl.question('Please the path of source directory : ',(answer) =>{
        enteredSrcDirPathName = answer
        if(enteredSrcDirPathName != ''){
            console.log(`The entered path of source directory : ${enteredSrcDirPathName}`)
            readDirAsync(enteredSrcDirPathName)
        }
    })


}

let readDirAsync = (dirame) =>{

    fs.readdir(dirame, (err,files)=>{
        if(err){
            console.log('Directory missing, enter another name')
            getDirName()
        }else{
            for(file of files){
                if(file.toString().indexOf('.') != -1){
                    fileArray.push(file);                    
                }
            }
            if(fileArray.length == 0){
                console.log('Directory is empty, Please try again')
                getComputedStyle()
            }else{
                let count = 0;
                for(let file1 of fileArray){
                    count++;
                    console.log(`${count} : ${file1}`)
                }

                readFileIndex()
            }//end else block

        }//end else block
    })


}// end readDirAsync function


let readFileIndex = () => {


    rl.question('Please enter the file number which you want to copy : ', (answer) => {

        inputFileIndexNumber = answer-1;
        if( inputFileIndexNumber != '' && inputFileIndexNumber != null && inputFileIndexNumber != undefined || inputFileIndexNumber<fileArray.length ){

            fileSelected = fileArray[inputFileIndexNumber]
            fullFileSelectedPath = `${enteredSrcDirPathName}/${fileSelected}`
            console.log('Selected file name : ',fileSelected)

            getDstDirName()
        }else{
            console.log('enter valid index number')
            readFileIndex()
        }


    })//question end

}//end readFileIndex

let getDstDirName = ()=>{

    rl.question('Please the path of destination directory : ',(answer) =>{
        enteredDstDirPathName = answer
        if(enteredDstDirPathName != ''){
            console.log(`The entered path of destination directory : ${enteredDstDirPathName}`)
        }

        fs.readdir(enteredDstDirPathName, (err, file) => {
            if(err){
                console.log("Destination directory missing, Please enter valid path")
                getDstDirName()
            }else{
                fileCopy(enteredDstDirPathName, fullFileSelectedPath)
            }

        })//end readdir
        rl.close()
    })//end question


}// end getDstDirName


let fileCopy = (destinationPath, sourcePath) => {

    let readStream = fs.createReadStream(sourcePath)
    let writeStream = fs.createWriteStream(`${destinationPath}/${fileSelected}`)
    readStream.on('data', (chunk) => {
        writeStream.write(chunk)
        //console.log(chunk)
    })
    readStream.on('end', () => {
        console.log('File Read Complete')
        writeStream.end()
        console.log('File Write Complete')
    })
}

module.exports={
    getSrcDirName : getSrcDirName
}
