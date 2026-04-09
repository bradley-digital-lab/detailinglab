const fs = require('fs');

let points = [];
points.push(`M 30,90`); 
points.push(`C 35,50 40,20 50,20`); 
points.push(`C 70,20 80,40 60,60`); 
points.push(`C 90,60 100,90 70,110`); 
points.push(`C 40,130 10,100 30,80`); 
points.push(`C 50,60 80,80 100,60`); 
points.push(`C 110,50 120,50 130,60`); 
points.push(`C 125,70 125,100 135,100`); 
points.push(`C 150,100 160,70 170,70`); 
points.push(`C 140,70 140,100 160,100`); 
points.push(`C 165,100 165,70 170,70`); 
points.push(`C 170,90 170,100 180,100`); 
points.push(`C 195,100 205,70 215,70`); 
points.push(`C 185,70 185,100 205,100`); 
points.push(`C 215,100 215,10 220,10`); 
points.push(`C 220,50 215,100 230,100`); 
points.push(`C 270,100 350,90 450,50`); 

fs.writeFileSync('sig.txt', points.join(' '));
console.log("ready");
