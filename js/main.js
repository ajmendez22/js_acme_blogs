//1 createElemWithText
function createElemWithText(HTMLElemStrngToCrt = "p", txtContntOfElToCrt = "", classNameifOneNeeded) {
  let requestedElementCreated = document.createElement(HTMLElemStrngToCrt);
  requestedElementCreated.textContent = txtContntOfElToCrt;
  if (classNameifOneNeeded) {
    requestedElementCreated.className = classNameifOneNeeded;
  }

  return requestedElementCreated;
}

//2 createSelectOptions
function createSelectOptions(users){
    //if no data parameter is given, returns undefined.
    if(users === undefined || users  === null){
        return undefined
    }
    optionArray = []
    for(user of users){
        console.log(user)
        var opt = document.createElement('option');
        opt.value = user.id;
        opt.innerHTML = user.name;
        optionArray.push(opt);

    }
    return optionArray
}

//3 toggleCommentSection
function toggleCommentSection(postId) {
            if (!postId) {
                return undefined;
            } else {
                const commentSections = document.querySelectorAll('[data-post-id]');
                for (let i = 0; i < commentSections.length; i++) {
                    const commentSection = commentSections[i];
                    if (commentSection.getAttribute('data-post-id') === postId) {
                        commentSection.classList.toggle('hide');
                        return commentSection;
                    }
                }
                return null;
            }   
        }
//4 toggleCommentButton
function toggleCommentButton (postID) {
  if (!postID) {
    return;
  }
  const btnSelectedEl = document.querySelector(`button[data-post-id = "${postID}"`);
  if (btnSelectedEl != null) {
    btnSelectedEl.textContent === "Show Comments" ? (btnSelectedEl.textContent = "Hide Comments") : (btnSelectedEl.textContent = "Show Comments");
  }
  return btnSelectedEl;
};
console.log(toggleCommentButton("btnToTest"));
//5 deleteChildElements
function remove() {
deleteChildElements(document.getElementById("div"));
}

function deleteChildElements(parentElement) {
let child = parentElement.lastElementChild;
while (child) {
parentElement.removeChild(child);
child = parentElement.lastElementChild;
}
return parentElement;
}
//6 addButtonListeners
const addButtonListeners = () => {
    let myMainElem = document.querySelector('main')
    let buttonsList = myMainElem.querySelectorAll('button')
    if(buttonsList){
        for(let i = 0; i < buttonsList.length; i++){
            let myButton = buttonsList[i]
            let postId = myButton.dataset.postId
            myButton.addEventListener('click', function(event){
                toggleCommentButton(event, postId), false
            })
        }
        return buttonsList
    }
}
//7 removeButtonListeners
const removeButtonListeners = () => {
    let myMainElem = document.querySelector('main')
    let buttonsList = myMainElem.querySelectorAll('button')
    console.log(buttonsList)
    if(buttonsList){
        for(let i = 0; i < buttonsList.length; i++){
            let myButton = buttonsList[i]
            let postId = myButton.dataset.postId
            myButton.removeEventListener('click', function(event){ 
            toggleCommentButton(event, postId), false
        })
        }
        return buttonsList
    }
}
//8 createComments
function createComments(comments) {
      if (!comments) {
        return undefined;      
      }
   let frag = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
  const element = comments[i];
    let a = document.createElement("a");
    let h3 = createElemWithText("h3", comment.name);
     let p1 = createElemWithText("p", comment.body);
    let p2 = createElemWithText("p", `From: ${comment.email}`);
            a.appendChild(h3);
        a.appendChild(p);
        a.appendChild(p);
            frag.appendChild(a);
      }
        return frag;
    }
//9 populateSelectMenu
function populateSelectMenu(users) {
    if (!users) return;
    let menu = document.querySelector("#selectMenu");
    let options = createSelectOptions(users);
    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        menu.append(option);
    } 
    return menu;
}
//10 getUsers
let getUsers = async() => {
        let retrieve;
        try {
            retrieve = await fetch("https://jsonplaceholder.typicode.com/users");
        }
        catch (error) {
            console.log(error);
        }
        return await retrieve.json();

    }
//11 getUserPosts
let getUserPosts = async(userId) => {
        if (!userId) return;
        let retrieve;
        try {
            retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        } 
        catch (error) {
            console.log(error);
        }
        return retrieve.json();

    }
//12  getUser
let getUser = async(userId) => {
        if (!userId) return;
        let retrieve;
        try {
            retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        } 
        catch (error) {
            console.log(error);
        }
        return retrieve.json();
    }
//13  getPostComments
const getPostComments = async (postId) => {
    if(!postId) return;
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        const jsonPostComments = await response.json();
        return jsonPostComments;
        } catch(error){
            console.log(error);
    }
}

//14 displayComments
const displayComments = async (postId) => {
    if (!postId){
        return undefined;
    }
    let mySection = document.createElement("section");
    mySection.dataset.postId = postId;
    mySection.classList.add("comments", "hide");
    let comments = await getPostComments(postId);
    let fragment = createComments(comments);
    mySection.append(fragment);
    return mySection;
}
//15 createPosts
const createPosts = async (jsonPosts) => {
    if(!jsonPosts) return;

    let fragment = document.createDocumentFragment();

    for (let i = 0; i < jsonPosts.length; i++) {

        let post = jsonPosts[i];

        let article = document.createElement("article");
        let section = await displayComments(post.id);
        let author = await getUser(post.userId);

        let h2 = createElemWithText("h2", post.title);
        let p = createElemWithText("p", post.body);
        let p2 = createElemWithText("p", `Post ID: ${post.id}`);

        let p3 = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
        let p4 = createElemWithText("p", `${author.company.catchPhrase}`);

        let button = createElemWithText("button", "Show Comments");
        button.dataset.postId = post.id;

        article.append(h2, p, p2, p3, p4, button, section); 

        fragment.append(article);
    }
    console.log(fragment);
    return fragment;
};


//16 displayPosts
const displayPosts = async (posts) => {
    let myMain = document.querySelector("main");
    let element = (posts) ? await createPosts(posts) : document.querySelector("main p");
    myMain.append(element);
    return element;
}

//17 toggleComments
function toggleComments(event, postId){
    if (!event || !postId){
        return undefined;
    }
    event.target.listener = true;
    let section  = toggleCommentSection(postId);
    let button = toggleCommentButton(postId);
    return [section, button];
}

//18 refreshPosts
const refreshPosts = async (posts) => {
    if (!posts){
        return undefined;
    }
    let buttons = removeButtonListeners();
    let myMain = deleteChildElements(document.querySelector("main"));
    let fragment = await displayPosts(posts);
    let button = addButtonListeners();
    return [buttons, myMain, fragment, button];
}

//19 selectMenuChangeEventHandler
const selectMenuChangeEventHandler = async (e) => {
    let userId = e?.target?.value || 1;
    let posts = await getUserPosts(userId);
    let refreshPostsArray = await refreshPosts(posts);
    return [userId, posts, refreshPostsArray];
}

//20  initPage
const initPage = async() => {
    let users = await getUsers();
    let select = populateSelectMenu(users);
    return [users, select];
}

//21  initApp
function initApp(){
    initPage();
    let select = document.getElementById("selectMenu");
    select.addEventListener("change", selectMenuChangeEventHandler, false);
}

document.addEventListener("DOMContentLoaded", initApp, false);
