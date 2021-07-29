// 
function delete_row(r)//delete function
    {
        var i = r.parentNode.parentNode.rowIndex;
        document.getElementById("tab").deleteRow(i);  

    }
    var li;
    function helpCancel(...args){
        li=args;
        
    }
    
    function edit_row(no)//edit function
        {
            
            document.getElementById("edit_button"+no).style.visibility="hidden";
            document.getElementById("save_button"+no).style.visibility="visible";
            document.getElementById("cancel_button"+no).style.visibility="visible";

            var FirstName=document.getElementById("First__Name"+no);
            var MiddleName=document.getElementById("Middle__Name"+no);
            var LastName=document.getElementById("Last__Name"+no);
            var email =document.getElementById("Email"+no) ;  
            var Phone_N =document.getElementById("Phone_Number"+no) ; 
            var role =document.getElementById("Role"+no) ; 
            var address =document.getElementById("Address"+no) ;

            var FName=FirstName.innerHTML;
            var MName=MiddleName.innerHTML;
            var LName=LastName.innerHTML;
            var Email=email.innerHTML;
            var Phone=Phone_N.innerHTML;
            var Role=role.innerHTML;
            var Address=address.innerHTML;
            
                  helpCancel(FName,MName,LName,Email,Phone,Role,Address);
              
            FirstName.innerHTML="<input type='text' id='First_Name"+no+"'  value='"+FName+"'/>";
            MiddleName.innerHTML="<input type='text' id='Middle_Name"+no+"'  value='"+MName+"'/>";
            LastName.innerHTML="<input type='text' id='Last_Name"+no+"'  value='"+LName+"'/>";
            email.innerHTML="<input type='text' id='Email_"+no+"'  value='"+Email+"'/>";
            Phone_N.innerHTML="<input type='text' id='Phone_Number_"+no+"'  value='"+Phone+"'/>";
            role.innerHTML="<input type='text' id='Role_"+no+"'  value='"+Role+"'/>";
            address.innerHTML="<input type='text' id='Address_"+no+"'  value='"+Address+"'/>";
        } 
        function save_row(no)//save function
                {
                 //var no = r.parentNode.parentNode.rowIndex;
                 var FirstName=document.getElementById("First_Name"+no).value;
                 var MiddleName=document.getElementById("Middle_Name"+no).value;
                 var LastName=document.getElementById("Last_Name"+no).value;
                 var email =document.getElementById("Email_"+no).value ;  
                 var Phone_N =document.getElementById("Phone_Number_"+no).value ; 
                 var role =document.getElementById("Role_"+no).value ; 
                 var address =document.getElementById("Address_"+no).value ;
                
                 document.getElementById("First__Name"+no).innerHTML=FirstName;
                 document.getElementById("Middle__Name"+no).innerHTML=MiddleName;
                 document.getElementById("Last__Name"+no).innerHTML=LastName;
                 document.getElementById("Email"+no).innerHTML=email ;  
                 document.getElementById("Phone_Number"+no).innerHTML=Phone_N ; 
                 document.getElementById("Role"+no).innerHTML=role ; 
                 document.getElementById("Address"+no).innerHTML=address ;
                
                 document.getElementById("edit_button"+no).style.visibility="visible";
                 document.getElementById("save_button"+no).style.visibility="hidden";
                 document.getElementById("cancel_button"+no).style.visibility="hidden";
                } 
        function cancel_row(no){ //cancel function
            
            document.getElementById("First__Name"+no).innerHTML=li[0];
            document.getElementById("Middle__Name"+no).innerHTML=li[1];
            document.getElementById("Last__Name"+no).innerHTML=li[2];
            document.getElementById("Email"+no).innerHTML=li[3] ;  
            document.getElementById("Phone_Number"+no).innerHTML=li[4] ; 
            document.getElementById("Role"+no).innerHTML=li[5]; 
            document.getElementById("Address"+no).innerHTML=li[6];
                
            document.getElementById("edit_button"+no).style.visibility="visible";
            document.getElementById("save_button"+no).style.visibility="hidden";
            document.getElementById("cancel_button"+no).style.visibility="hidden";
        }                
    //Function called by Load button CreateTableFromJSON
    var col = []; //list to store values of header
    var k;        // to store table so that we can access table to add row
    var tableSize;     
   function CreateTableFromJSON() {
        controlCreate=1;
       //Changing load button to Refresh button after clicking on it.
        document.getElementById("wer").innerHTML="Refresh Data";
        //obects 
        let ObjectList = [];
    getUsers()
        .then(usersArray => {
         //creating object of crud with generic type of user
        //console.log(userArray);
        usersArray.forEach(function (object) { ObjectList.push(object); }); //pushing objects obtained via api into array
        
        // Promise.reso
            
        
        let myBooks=ObjectList;
        // tableSize=ObjectList.length();
        // console.log(tableSize);
        // EXTRACT VALUE FOR HTML TABLE HEADER. 
        console.log(ObjectList);
        //let myBooks=obj
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        
        var table = document.createElement("table");
        table.setAttribute("id","tab")
        //CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
        // var th = document.createElement("th");    //LAST COLUMN FOR EDIT AND DELETE BUTTON
        // tr.appendChild(th);
        //************ */
        var th = document.createElement("th");    // NEXT TO LAST COLUMN FOR SELECT BUTTON
        tr.appendChild(th);
        th.innerHTML="select row to perform RUD operations";
        
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myBooks.length; i++) {
            createRFT(i,myBooks,table)      //function create rows for each item in ListS(object) for table 
            
        }
       //CREATING CRUD create BUTTON 
        var butt1 = document. createElement("button");    
        butt1.setAttribute('id', 'butt1');  
        butt1.textContent = 'Create';             //Create
        butt1.setAttribute("onclick","createL()");

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        k=table; 
        divContainer.appendChild(table);
        //Using Decorator Function 
        // for (var i = 0; i < myBooks.length; i++) {  ////commenting for now
        //     var DT=FormatD(FormatDate);
                
        //     DT(i+1);}

        var divCont = document.getElementById("showManupulate");
        divCont.innerHTML = "";
        
        divCont.appendChild(butt1);  

    })
    .catch(()=> {alert("Unexpected Error Occured !")})  }
    
    //FUNCTION TO ADD ROW IN TABLE
    function createRFT(i,myBooks,table){
        tr = table.insertRow(-1);
            tr.setAttribute("id","row"+(i+1)+"")

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.setAttribute("id",col[j]+(i+1))
                tabCell.innerHTML = myBooks[i][col[j]];
            }

            // //adding EDIT button and setting its attribute
            // var tabCell = tr.insertCell(-1);
            // var button1= document. createElement("button");
            // button1.setAttribute('id', "edit_button"+(i+1));  
            // button1.textContent = 'Edit';
            // ////adding funtionality to EDIT button
            // button1.setAttribute("onclick","edit_row("+(i+1)+")");
            // tabCell.appendChild(button1);
            // //Adding save button which is visible after clicking on edit button

            // var button3= document.createElement("button");
            // button3.setAttribute('id', "save_button"+(i+1));  
            // button3.textContent = 'Save';
            // button3.style.visibility = "hidden";
            // button3.setAttribute("onclick","save_row("+(i+1)+")");
            // tabCell.appendChild(button3);

            // //Adding cancel button which is visible after clicking on edit button

            // var button4= document.createElement("button");
            // button4.setAttribute('id', "cancel_button"+(i+1));  
            // button4.textContent = 'cancel';
            // button4.style.visibility = "hidden";
            // button4.setAttribute("onclick","cancel_row("+(i+1)+")");

            // tabCell.appendChild(button4);
            
            // //adding delete button
            // var button2 = document. createElement("button");
            
            // button2.setAttribute('id', 'btni');  
            // button2.textContent = 'Delete';
            // button2.setAttribute("onclick","delete_row(this)");

            // tabCell.appendChild(button2)
            // //*********************** */
            var tabCell = tr.insertCell(-1);
            var Select1= document. createElement("button");
            Select1.setAttribute('id', "select"+(i+1));  
            Select1.textContent = 'Select';
            ////adding funtionality to EDIT button
            Select1.setAttribute("onclick","selectF("+(i+1)+")");
            tabCell.appendChild(Select1);
            
            //CRUD operations button
            var butt2 = document. createElement("button");    
            butt2.setAttribute('id', 'retrive'+(i+1));  
            butt2.textContent = 'Read';          //Read
            butt2.setAttribute("onclick","retriveV("+(i+1)+")");
            butt2.style.visibility = "hidden";
            tabCell.appendChild(butt2);

            var butt3 = document. createElement("button");    
            butt3.setAttribute('id', 'update'+(i+1));     
            butt3.textContent = 'Update';           // Update
            butt3.style.visibility = "hidden";
            tabCell.appendChild(butt3);
            butt3.setAttribute("onclick",`update(${i+1})`);

            var button3= document.createElement("button");
            button3.setAttribute('id', "saveUpdate"+(i+1));  
            button3.textContent = 'SaveU';
            button3.style.visibility = "hidden";
            button3.setAttribute("onclick",`saveU(${i+1},${myBooks[i].id})`);
            tabCell.appendChild(button3);

            //Adding cancel button which is visible after clicking on edit button

            var button4= document.createElement("button");
            button4.setAttribute('id', "cancelUpdate"+(i+1));  
            button4.textContent = 'cancelU';
            button4.style.visibility = "hidden";
            button4.setAttribute("onclick",`cancelU(${i+1})`);
            tabCell.appendChild(button4);


            var butt4 = document. createElement("button");    
            butt4.setAttribute('id', 'delete'+(i+1));  
            butt4.textContent = 'Delete';           //Delete
            butt4.style.visibility = "hidden";
            tabCell.appendChild(butt4);
            butt4.setAttribute("onclick",`deleteF(${myBooks[i].id})`);
                

    }
    