


function converter(sipher, step)
{
    var array='abcdefghigklmnopqrstuvwxyz';
    array=array.split('');
    sipher=sipher.split('');

    for(var i=0; i<sipher.length;i++)
    {
        if (sipher[i]==' '||sipher[i]=='-'){continue}//и можно добавить вообще все возможные разделители
        var index=array.indexOf(sipher[i])+step;
        if(index>=26){index=index-26;}
        sipher.splice(i,1,array[index]);
        index=0;
    }
    sipher=sipher.join('')
    return console.log(sipher);

}
var str='con verz-asd';
converter(str,1);