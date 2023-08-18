#!/usr/bin/env node

import inquirer from "inquirer";
import banner from "node-banner";
import chalk from "chalk";


let agan= true

interface student {
    student_id:string;
    name:string;
    courses:string[];
    balance:number;
    fees:string;
}

let std:student[]=[];

function wait(){
    return new Promise((resolve,rejects)=>{
        setTimeout(()=>{
         resolve(1);
          },4000);
    })
}
 
async function welcome(){
     console.log(`         ${chalk.yellow(`HELLO welcome to \n \n`)} `);
     await banner('STUDENT PORTAL', '');
     await wait();
     
}
function studentID(): string {
    const randomID = Math.floor(Math.random() * 90) + 10;
    return `SMS${randomID}`;
}

let addStudent=async ()=>{
   let detail= await inquirer.prompt([
    {
        name:"name",
        type:"input",
        message:"enter student name :"
    },
    {
        name:"course1",
        type:"list",
        message:"select your course1",
        choices:["maths","physics","chemistry","computer"]
    },
    {
        name:"course2",
        type:"list",
        message:"select your course2",
        choices:["maths","physics","chemistry","computer"]
    },
    {
        name:"course3",
        type:"list",
        message:"select your course3",
        choices:["maths","physics","chemistry","computer"]
    },
    {
        name:"balanc",
        type:"number",
        message:"student balance"
       
    },
    {
        name:"fee",
        type:"list",
        message:" student payy status",
        choices:["paid","unpaid"]
    }
   ])
   const studentdata:student= {
     student_id:studentID(),
     name:detail.name,
    courses:[detail.course1,detail.course2,detail.course3],
    balance:detail.balanc,
    fees:detail.fee
   }
    std.push(studentdata);
    console.log(std);
    return "student added";
}

let checkBalance=async ()=>{
    let a=true;
    let ans= await inquirer.prompt([
        {
            name:"id",
            type:"input",
            message:"enter the student_id"
        }
    ])
    
    for(let i =0;i<std.length;i++){
        if(ans.id==std[i].student_id){
            console.log(`${chalk.blue(std[i].student_id)} have balance ${chalk.yellow(std[i].balance)}`);
            a=false;
            break; 
        }
    }
    if(a){ console.log("invalid id");}
    

}

let payFee= async ()=>{
    let a=true;
    let ans= await inquirer.prompt([
        {
            name:"id",
            type:"input",
            message:"enter the student_id"
        }
    ])
    
    for(let i =0;i<std.length;i++){
        if(ans.id==std[i].student_id){
            console.log(`${chalk.blue(std[i].student_id)} status fee is  ${chalk.yellow(std[i].fees)}`);
            if(std[i].fees=="unpaid"){
                let ans1= await inquirer.prompt([
                   { 
                    name:"fee",
                    type:"list",
                    message:" student fee pay status",
                    choices:["paid","unpaid"]
                   }
                ])
                std[i].fees=ans1.fee;
            }
           a=false;
            break;
        }
    }  if(a){ console.log("invalid id");}
}

let viewStatus=async ()=>{
    let a=true;
    let ans= await inquirer.prompt([
        {
            name:"id",
            type:"input",
            message:"enter the student_id"
        }
    ])
    
    for(let i =0;i<std.length;i++){
        if(ans.id==std[i].student_id){
            console.log(std[i]);
            a=false
            break;
        }
    } if(a){ console.log("invalid id");}
}
let portal=async()=>{
    while(agan){
    let ans = await inquirer .prompt([
        {
            name:"perform",
            type:"list",
            message:"what you want to do",
            choices:["Add student","balance","tution fees","view status","all student status","exit"]
        }
    ])
    if(ans.perform=="Add student"){
      let k=  await addStudent();
      console.log(chalk.yellow(k));
    }else if (ans.perform=="balance"){
        await checkBalance();
    } else if(ans.perform=="tution fees"){
        await payFee();
    }else if (ans.perform=="view status"){
        await viewStatus();
    }else if(ans.perform=="all student status"){
        console.log(chalk.bgBlue(`student data is \n `));
        console.log(std);
    }else if(ans.perform=="exit"){
        agan=false;
    }
}
}

 function lastmessage(){
        console.log(`       ${chalk.green('GOOD BYE')} \n  `);
 }



async function steps(){
    await welcome();
    await portal();  
    await lastmessage();
}

steps();