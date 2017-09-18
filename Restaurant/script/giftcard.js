
$(document).ready(function(){
  $( "#tabs" ).tabs();
  
    var prev=document.getElementById("previous");//previous button 
    var nxt=document.getElementById("next");//next button
    var gift_card_wrapper=$("gift_card_wrapper");//gift card image wrapper
    var i=0;
    var preview;
    var myform=document.forms["myform"];
    var giftamt_form=document.forms["giftamt_form"];
    var addButton=document.getElementById("add");
    var cartBody=document.getElementById("gft_cart");
    var checkout=document.getElementById("check_out");
    var mytableRow=$(".cart_table_caption");
    var value;
    var calculated_amt=0;
    var sum=0;
    
    
    var qty=document.getElementById("add");
    var rname=document.getElementById("rname");
    var amt=document.getElementById("amt");
    
   
   var cnt=0;
   var allRecieverInfo=[];    
    
    
    
    var net_amt=[];
    var total_amt;
    var amount=0;
    
    var firstname;
    var lastname;
    var addr1;
    var addr2;
    var city;
    var pcode;
    var mesg;
    var flag=true;
    
    $(checkout).on('click',function(){
//        alert("clicked");
        //check_out_section=document.getElementById('check_out_section');
        //form_wrapper=document.getElementById('check_out_section');
        
        $("#before_check_out").css('display','none') //when uesr check out only show the selected gift cards
        $("#check_out_section").css('display','block');//show only the selected gift card
        
        var infoHtml="";
        //All receiveInfo is an array of array. When ever user fills up the form and clicks the add button, user information along with image selected is stored in an array and pushed to this allRecieverInfo array. So, looping through array of array to display the information in checkout section.
        for(var i=0;i<allRecieverInfo.length;i++){
            infoHtml="<div id=\"check_out_section\">";
            for(var j=0; j<allRecieverInfo[i].length;j++){
//                console.log("i="+i,"j="+j+' '+allRecieverInfo[i][j]);
                 
                
                switch(j){
                    case 0:  
                        infoHtml=infoHtml+"<div class=\"dspImage\"><img src=\""+allRecieverInfo[i][j]+"\"></div>";
//                        alert(infoHtml);
                        break;
                    case 1:
                        infoHtml=infoHtml+ "<div class=\"dspInfo\">"+"<div class=\"info_title\">Reciever Name:</div>"+"<div class=\"infor\">"+allRecieverInfo[i][j]+"</div></div>";
//                        alert(infoHtml);
                        break;
                    case 2:
                       infoHtml=infoHtml+"<div class=\"dspInfo\"><div class=\"info_title\">Reciever Address1:</div>"+"<div class=\"infor\">"+allRecieverInfo[i][j]+"</div></div>";
//                        alert(infoHtml);
                        break;
                    case 3:
                        infoHtml=infoHtml+"<div class=\"dspInfo\"><div class=\"info_title\">Reciever Address2:</div>"+"<div class=\"infor\">"+allRecieverInfo[i][j]+"</div></div>";
//                        alert(infoHtml);
                        break;
                    case 4:
                        infoHtml=infoHtml+"<div class=\"dspInfo\"><div class=\"info_title\">city:</div>"+"<div class=\"infor\">"+allRecieverInfo[i][j]+"</div></div>";
//                        alert(infoHtml);
                        break;
                    case 5:
                        infoHtml=infoHtml+"<div class=\"dspInfo\"><div class=\"info_title\">Postal Code:</div>"+"<div class=\"infor\">"+allRecieverInfo[i][j]+"</div></div>";
//                        alert(infoHtml);
                        break;
                    case 6:
                        infoHtml=infoHtml+"<div class=\"dspInfo\"><div class=\"info_title\">Message:</div>"+"<div class=\"infor\">"+allRecieverInfo[i][j]+"</div></div>";
//                        alert(infoHtml);
                        break;
                    case 7:
                        infoHtml=infoHtml+"<div class=\"dspInfo\"><div class=\"info_title\">Amount:</div>"+"<div class=\"infor\">$"+allRecieverInfo[i][j]+".00 CAD</div></div></div></div>";
//                        alert(infoHtml);
                        break;
                        
                }
                      
            }
            //console.log(infoHtml);
            $("#check_out_section_wrapper").append(infoHtml);//add the html tag created by the loop to the existing div section.
             
        }
    });
        
    //This section handles removing items from array and shopping cart.
       $(cartBody).on("click",'tr',function(){
           
          
           var sum=0
//           value=parseInt(($(this).find('td:nth-child(1)').text()));
            var selectedIndex=($(this).index()-1);//get the index of selected row of the shopping cart table
           
            $(this).hide(500);//hide that particular row;
           //console.log(net_amt);
//           var index=net_amt.indexOf(value);
            net_amt.splice(selectedIndex,1); //remove the amount of selected row from array.
            allRecieverInfo.splice(selectedIndex,1);//remove information from the allRecieverInfo array
//           alert("net_amt_length"+net_amt.length);
           if(net_amt.length-1<1){
               
              $("#shopping_cart_wrapper").css('display','none'); //if no item is added to shopping cart table then do not display the shopping cart and check out section.
          }
//           console.log(net_amt);
//           console.log(allRecieverInfo);
           
//           alert(amtinTotal());
           if(amtinTotal(0)<=500){
//               alert(sum);
               addButton.disabled=false; //if one of the row of shopping cart is deleted , enable the add button to allow user to add gift card until the amount reach $500
//               $(addButton).addClass('button');
           }
           cnt=cnt-1;//when row is deleted decrease the counter.
           
    });
    
    
    //function  tat assign the total sum of an array to a variable calulated, so that this can be used from different section of the program to check it does not exceed $500, like while deleting from shopping cart and adding it to the shopping cart. it has to be updated along with the net_amt. and 
    function amtinTotal(val){
        sum=0;
        for(var i=0;i<net_amt.length;i++){
               sum=sum+net_amt[i];
           }
        if(val!==undefined)
        calculated_amt=sum+val;
        else
        calculated_amt=sum;
        //alert(calculated_amt);
        return calculated_amt; 
    }
   
    
        
    

    
    
    
    if(total_amt<=490){
        addButton.disabled=false;
    }
        
    nxt.addEventListener('click',function(){nextImg()},false)//when user clicks in next button class nextImg() function
    prev.addEventListener('click',function(){prvImg()},false)//when user clicks in previous button vall prvImg() function
    
    
    /*Enable next button if there is atleast one more image to display and disable it if its the last image*/
    function nextImg(){
        $(preview).attr('src',"");  
        //Enable the previous button once the next button is clicked
        $("#previous").css('color','orange');
        $("#previous").css('border','1px solid orange');
        $("#previous").css('cursor','pointer');

        if(i===$(".gift_card_wrapper").length-1){
            i=i-1;
          }

        //disable next button if currently displayed 2 images are the last images to display.
        if(i===$(".gift_card_wrapper").length-2){
            $("#next").css('color','#666');
            $("#next").css('border','1px solid #666');
            $("#next").css('cursor','crosshair');
        }


        var nxtelement=$(".gift_card_wrapper")[i];
        var displayImage=$(".gift_card_wrapper")[i+1];

        if(i<=$(nxtelement).length)
        {
            $(nxtelement).css('display','none');
        }
        i=i+1;
        $("#card_design").attr('src',$(displayImage).find('img').attr('src'));//selected image and the gift card image should have the same source. so find the source of selected image and set the source of gift card same.

    }
    
    function prvImg(){
        $(preview).attr('src',"");
        i=i-1;
        j=i;
        if(i<=0){
            i=0;
            $("#previous").css('color','#666');
            $("#previous").css('border','1px solid #666');
            $("#previous").css('cursor','crosshair');
        }
            
        var prvelement=$(".gift_card_wrapper")[i];
        var displayImage=$(".gift_card_wrapper")[j];
        $(prvelement).css('display','block');
        $("#card_design").attr('src',$(displayImage).find('img').attr('src'));
        j=j-1;
        
       
            $("#next").css('color','orange');
            $("#next").css('border','1px solid orange');
            $("#next").css('cursor','pointer');
        
    }
    
    //When user choose to put his/her own picture for gift card. Read the path and dispaly it in giftcard box at the top.
    
    $("input:file").change(function (){
       preview = document.querySelector('#image_preview'); 
       var file    = document.querySelector('input[type=file]').files[0];
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
           $("#card_design").attr('src',reader.result);
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
        

     });
    
    
    $(".amount_denomination").click(function(){
        $("#amount").val($(this).val());//set the amount of amount textbox equal to the value of the clicked text box value
    });
    
    addButton.onclick=function()
    {
        //when user fill up the form and want to add the gift card...validate the user input. Calling the function calculateTotal that returns true ony if the input is valid or return false if the input is invalid.
        if(validateInput())
        {
            var checkAmount=calulateTotal()
            var rcvInfoArray=[];
            if(checkAmount<=500){
                $("#shopping_cart_wrapper").css('display','block');
                var rname=firstname+" "+lastname
                var imgPath=$("#card_design").attr('src');
                //console.log(rname,addr1,addr2,city,pcode,mesg,imgPath);
//                console.log(mytableRow.length);
                obj="<tr class=\"cart_table_caption\"><td class=\"qty\">"+cnt+"</td><td>"+rname+"</td><td>"+amount+"</td><td><img src=\"images/delete.png\"/></td></tr>"
                cartBody.innerHTML+=obj;
                if(addr2===undefined){
                    addr2="N/A";
                              
                }
//                console.log(addr2);
               
                rcvInfoArray=[imgPath,rname,addr1,addr2,city,pcode,mesg,amount];
                allRecieverInfo.push(rcvInfoArray);
//                console.log(allRecieverInfo);
            }
            else if(checkAmount>500){
                if(amtinTotal(0)>=500)
                    addButton.disabled=true;
                else
                    {
                        addButton.disabled=false;
                    }
//                addButton.style.background="gray";
                alert("You cannot add more than $500 CAD gift card.")
            }
        }
       
        
    }
    
    function calulateTotal()
    {
//        console.log(net_amt);
        total_amt=0;
        var gift_card_quantity=giftamt_form.quantity.value;//assign the quantity(numbers of gift cards) selected by the user

        if(giftamt_form.amount.value!=="") //make sure the user has selected the amount or input some value for the gift card
        {
            var gift_card_amount=giftamt_form.amount.value; //get the value of the gift card
            amount=parseInt(gift_card_quantity) *parseInt(gift_card_amount);//multiply the amount with quantity and as textbox value are string convert it to integer.

            //before inserting the total amount in net_amount make sure it does not exceed $500. Call the function amtInTotal that adds the current amount to the existing amount of other selected gift card and returns the calculated_amt. IF the  net amount is less than 500 allow to push it in net_amt array and increment cnt to show how many cards are there in gift cards.
            if(amtinTotal(amount)<=500){

                    net_amt.push(amount);
                    cnt=cnt+1;
//                    for(var i=0;i<net_amt.length;i++){
//                      total_amt=net_amt[i]+total_amt;
//                    }
            }
             return calculated_amt;



        }
        else//if uesr deletes the default value, insert 10 as the min value to the text box where user enters the gift card value or select from pre-defined denominations.
        {
            giftamt_form.amount.focus()
            giftamt_form.amount.value=10;
        }
     }
    
    function validateInput()
    {
        flag=true;
        var RegEx=/^[A-Za-z ]+$/i;//regualar expression to test name
        var addReg=/^(\d{3,})\s?(\w{0,5})\s([a-zA-Z]{2,30})\s([a-zA-Z]{2,15})\.?\s?(\w{0,5})$/i; //address validation regular expresssion.
        var pcodeReg=/^[A-Z]{1}[1-9]{1}[A-Z]{1}\s?|-?[1-9]{1}[A-Z]{1}[1-9]{1}$/i;//postal code regular expression
        
        var cityElement=myform.city;
        city=cityElement.options[cityElement.selectedIndex].value;
        
        if(myform.msg.value===null||myform.msg.value==="")
        {
            myform.msg.style.background="red"
            flag=false;
            myform.msg.focus();
        }
        else
        {
            mesg=myform.msg.value;
            myform.msg.style.background="white"
            
        }
        
        if(pcodeReg.test(myform.PCode.value)){
            myform.PCode.value=myform.PCode.value.toUpperCase();
            pcode=myform.PCode.value;
            myform.PCode.style.background="white";
            
        }
        else{
            myform.PCode.style.background="red";
            myform.PCode.focus();      
            
        }
        
        if(myform.address2.value!=="")
        {
            
//            if(addReg.test(myform.address2.value)){
                addr2=myform.address2.value;
//                myform.address2.style.background="white";
                
//            }
//            else
//            {
//               myform.address2.style.background="red";
//               myform.address2.focus();      
//               flag=false;          
//            }
        }
                
        if(addReg.test(myform.address1.value)){
            addr1=myform.address1.value;
            myform.address1.style.background="white";
            
        }
        else
        {
           myform.address1.style.background="red";
           myform.address1.focus();      
           flag=false;          
        }
        
               
        if(RegEx.test(myform.lname.value)){
            lastname=titleCase(myform.lname.value);
            myform.lname.style.background="white";
            myform.lname.value=lastname
            
        }
        else
        {
               myform.lname.style.background="red";
               myform.lname.focus();      
               flag=false;          
        }
        
        if(RegEx.test(myform.fname.value))
        {
            firstname=titleCase(myform.fname.value);
            myform.fname.style.background="white";
            myform.fname.value=firstname;
        }
        else
        {
           myform.fname.style.background="red";
           myform.fname.focus(); 
            flag=false; 
        }
           
        if(RegEx.test(myform.sender.value))// check if the input of the user is valid by checking it meets our regular expression pattern.
        {
            var senderName=titleCase(myform.sender.value);//if the input is valid call the function titleCase to make the user name input into title cas.
            myform.sender.style.backgroundColor="white";
            myform.sender.value=senderName;
        }
        else
        {
            myform.sender.style.backgroundColor="red"; //if the user input does not match the regular expression change textbox color red and set focus on it.
            myform.sender.focus();
            flag=false;
        }
       return flag;
}
    
    // function to make title case
    function titleCase(stringValue){
        stringValue=stringValue.toLowerCase().split(' '); //make all the input as lowercase and split the input whenever it finds space in between words.
        
        for(var i=0;i<stringValue.length;i++){
            stringValue[i]=stringValue[i].split('');//split the first word, first character of the word and all other alphabets.
            stringValue[i][0]=stringValue[i][0].toUpperCase();//set the first character as uppercase
            stringValue[i]=stringValue[i].join('');//join it back as a string.
        }
        return stringValue.join(' '); //finally join all the splitted array as string. and return.
    }
    
   
//.submit=function(){
//     alert("helo");
// }
 
     
  });  
  