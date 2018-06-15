function ajax(oPrmt){
    oPrmt = Object.assign({
        type: 'POST',
        url: '',
        responseType: '',//空字符串即默认为text格式
        async: true,
        data: null,
        success() {},
        fail() {}
    }, oPrmt);
    oPrmt.type = oPrmt.type.toUpperCase();
    let xmlHttp = XMLHttpRequest? new XMLHttpRequest(): new ActiveXObject('Microsoft.XMLHTTP'),
        tempData = [];
    xmlHttp.responseType = oPrmt.responseType;
    console.log(xmlHttp.responseType);
    for(let key in oPrmt.data)
    {
        tempData.push(`${key}=${oPrmt.data[key]}`);
    }
    let postData = tempData.join('&');

    if (oPrmt.type === 'POST') 
    {
        xmlHttp.open(oPrmt.type, oPrmt.url, oPrmt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    } 
    else if (oPrmt.type.toUpperCase() === 'GET') 
    {
        xmlHttp.open(oPrmt.type, `${oPrmt.url}?${postData}`, oPrmt.async);
        xmlHttp.send(null);
    }

    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4) 
        {
            if((xmlHttp.status >= 200 && xmlHttp.status < 300) || xmlHttp.status === 304)
            {
                oPrmt.success(xmlHttp.response);
            }
            else
            {
                oPrmt.fail(xmlHttp.response);
            }
        }
    };
}

export {ajax};