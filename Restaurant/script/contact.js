$(document).ready(function(){ 
    var contactForm= document.forms[0];
    
    
    $(contactForm).submit(function(){
       var chck=validateInput();
        if(chck===true){
            alert("we will contact you soon!! Have a good day")
        }
        return false;
    });
    
    function validateInput()
    {
//        alert("hello");
//        console.log(contactForm);
        flag=true;
        var RegEx=/^[A-Za-z ]+$/i;
        var addReg=/^(\d{3,})\s?(\w{0,5})\s([a-zA-Z]{2,30})\s([a-zA-Z]{2,15})\.?\s?(\w{0,5})$/i;  
        var pcodeReg=/^[A-Z]{1}[1-9]{1}[A-Z]{1}\s?|-?[1-9]{1}[A-Z]{1}[1-9]{1}$/i;
        var emailReg = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/;
        
        
        if(contactForm.msg.value===null||contactForm.msg.value==="")
        {
            contactForm.msg.style.background="red"
            flag=false;
            contactForm.msg.focus();
            msg=contactForm.msg.value;
        }
        else
        {
            mesg=contactForm.msg.value;
            contactForm.msg.style.background="white"
            
        }
        
       
        
        if(contactForm.mail.value==""||contactForm.mail.value===null)
        {
            contactForm.mail.style.background="red";
            contactForm.mail.focus();
        }
        if(emailReg.test(contactForm.mail.value)){
            contactForm.mail.style.background="white"
            email=contactForm.mail.value;
            
        }
        else
            {
                contactForm.mail.style.background="red";
                contactForm.mail.focus();
            }
        
        
        if(pcodeReg.test(contactForm.PCode.value)){
            contactForm.PCode.value=contactForm.PCode.value.toUpperCase();
            pcode=contactForm.PCode.value;
            contactForm.PCode.style.background="white";
            
        }
        else{
            contactForm.PCode.style.background="red";
            contactForm.PCode.focus();      
            
        }
        
        if(RegEx.test(contactForm.city.value)){
            city=titleCase(contactForm.city.value)
            contactForm.address1.style.background="white";
            
        }
        else
        {
            alert("in city");
           contactForm.city.style.background="red";
           contactForm.city.focus();      
           flag=false;          
        }
        
                       
        if(addReg.test(contactForm.address1.value)){
            addr1=contactForm.address1.value;
            contactForm.address1.style.background="white";
            
        }
        else
        {
           contactForm.address1.style.background="red";
           contactForm.address1.focus();      
           flag=false;          
        }
        
               
        if(RegEx.test(contactForm.lname.value)){
            lastname=titleCase(contactForm.lname.value);
            contactForm.lname.style.background="white";
            contactForm.lname.value=lastname
            
        }
        else
        {
               contactForm.lname.style.background="red";
               contactForm.lname.focus();      
               flag=false;          
        }
        
        if(RegEx.test(contactForm.fname.value))
        {
            firstname=titleCase(contactForm.fname.value);
            contactForm.fname.style.background="white";
            contactForm.fname.value=firstname;
        }
        else
        {
           contactForm.fname.style.background="red";
           contactForm.fname.focus(); 
            flag=false; 
        }
           
       
       return flag;
}
    
    function titleCase(stringValue){
        stringValue=stringValue.toLowerCase().split(' ');
        
        for(var i=0;i<stringValue.length;i++){
            stringValue[i]=stringValue[i].split('');
            stringValue[i][0]=stringValue[i][0].toUpperCase();
            stringValue[i]=stringValue[i].join('');
        }
        return stringValue.join(' ');
    }
    
    
    
});

