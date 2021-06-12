const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const Qed42Url = 'https://www.qed42.com/blog/javascript'; // Url to scrap the data

//find the link with the help of keyword
let findLink = async (keyword) => {
    //Using Got to retrieve data to use with jsdom
    got(Qed42Url).then(response => {
        let uniq = [] // empty array to store uniqe values
        let blogListarray = [] // empty arrray to store all links to array
        const dom = new JSDOM(response.body);  // pass the all html to dom
        dom.window.document.querySelectorAll('a').forEach(link => { // find all links with "a"
            if (link.href.includes('blog')) { // find all links containing blog keyword
                blogListarray.push(link.href)
                uniq = [...new Set(blogListarray)]; // store uniqe links
            }
        });
        let a = uniq.map((m) => {
            if (m.includes(keyword)) {
                if (m != undefined) {
                    return (m)
                }
            }
        })
        a.filter((f) => {
            if (f != undefined) {
                console.log(`https://www.qed42.com${f}`) // link which we are finding
            }
        })
    }).catch(err => {
        console.log(err);
    });
}


findLink("scroll"); // function call

