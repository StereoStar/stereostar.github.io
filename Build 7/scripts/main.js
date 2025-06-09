document.addEventListener('DOMContentLoaded', () => {
    const dialogueBox = document.getElementById('dialogue');
    const dialogueText = document.getElementById('dialogue-text');
    const dialogueOptions = document.getElementById('dialogue-options');
    const dialogueNextButton = document.getElementById('dialogue-next');
    const inventoryBox = document.getElementById('inventory');
    const inventoryItemsContainer = document.getElementById('inventoryItems');
    const clickBlockerDiv = document.getElementById('clickBlockerDiv');
    const overlay = document.getElementById('fade-overlay');
    const clickablesBox = document.getElementById('clickablesDiv');
    let currentRoom = "introRoom1";
    let dummyVar = "0";
    let coneGiven = false;
    let michaelTalkedTo = false;
    let deskChecked = false;
    let sofiaTableChecked = false;

    let inventory = []; // Array to store item's keys (e.g., ['object1'])
    // Sample inventory items dictionary for reference
    const items = {
        sweater: { src: 'images/sweater3.gif', name: 'Sweater' },
        object1: { src: 'images/object1.png', name: 'Traffic Cone' },
        sodaCan: { src: 'images/sodaCan.png', name: 'Soda Can' },
        sodaCannon: { src: 'images/sodaCannon.png', name: 'Soda Cannon' }
    };

    
    loadRoom('introRoom1');


    // ==================
    // ROOM SYSTEM
    // ==================
    // Attempt at loadRoom function - function to check for progress variables, 
    // then populate background, characters/objects and nav arrows? 
    // (or play cutscene, if relevant)
    function loadRoom(nextRoom) {
        fadeToBlack(() => {
            clickablesBox.innerHTML = '';
            if (nextRoom == "startingRoom") {
                currentRoom = "startingRoom";           
                changeBackground('images/background1.jpg');
                populateCharacterOne();
                populateNavLeft();
                //showStartingRoomElements(); //This may not be needed unless we want to chunk it down more.
            } else if (nextRoom == "secondRoom") {
                currentRoom = "secondRoom";
                changeBackground('images/background2.jpg');
                if (!inventory.includes('object1') && coneGiven == false) {
                    populateObjectOne();
                }
                populateNavRight();
            } else if (nextRoom == "introRoom1") {
                currentRoom = "introRoom1";
                changeBackground('images/intro1.png');
                populateIntroSign();
            } else if (nextRoom == "introRoom2") {
                currentRoom = "introRoom2";
                changeBackground('images/intro2.png');
                populateNavToIntro3();
            } else if (nextRoom == "introRoom3") {
                currentRoom = "introRoom3";
                changeBackground('images/intro3.png');
                populateFrontDoor();   
            } else if (nextRoom == "upperLobby") {
                currentRoom = "upperLobby";
                changeBackground('images/upperLobby.jpg');
                populateMichael1();
                populateUpperElevatorButton();
            } else if (nextRoom == "lowerLobby") {
                currentRoom = "lowerLobby";
                changeBackground('images/lowerLobby.jpg');
                populateMichael2();     
                populateDesk();
            } else if (nextRoom == "officeVending") {
                currentRoom = "officeVending";
                changeBackground('images/officeVending.jpg');
                populateJack1();
                populateVendingMachine();
            } else if (nextRoom == "hallway") {
                currentRoom = "hallway";
                changeBackground('images/hallway.jpg');
                populateJack2();
            
            } else if (nextRoom == "sofiaWorkshop") {
                currentRoom = "sofiaWorkshop";
                changeBackground('images/sofiaWorkshop_v2.jpg');
                populateSofiaTable();
                populateSofia();
                populateJack3();
            
            } else if (nextRoom == "void") {
                currentRoom = "void";
                changeBackground('images/void.jpg');
                populateJack4(); 
            
            } else if (nextRoom == "officeWide") {
                currentRoom = "officeWide";
                changeBackground('images/officeWide.jpg');
                populateJoe2();
                
            } else if (nextRoom == "officeWideTwo") {
                currentRoom = "officeWideTwo";
                changeBackground('images/officeWide.jpg');
                populateJoe3();
                populateMichael3();
                
            } else if (nextRoom == "endScreen") {
                currentRoom = "endScreen";
                changeBackground('images/endScreen.jpg');
            }

            fadeFromBlack();
        });
    }

    // Example of handling clicks on game elements

    // Current demo method of handling navigation and loading backgrounds.
    // Will likely need to have unique nav arrows for different rooms.
    

    // CHARACTERS
    function populateCharacterOne() {
        clickablesBox.innerHTML += '<img id="character1" class="clickable" src="images/sweater3.gif" alt="Character 1" style="top: 90px; left: 270px; height: 70%;">';
    }
    
    function populateMichael1() {
        clickablesBox.innerHTML += '<img id="michael1" class="clickable" src="images/michael-idle-1.gif" alt="Michael 1" style="top: 120px; left: 160px; height: 70%;">';
    }

    function populateMichael2() {
        clickablesBox.innerHTML += '<img id="michael2" class="clickable" src="images/michael-idle-2.gif" alt="Michael 2" style="top: 180px; left: 160px; height: 65%;">';
    }
    function populateMichael3() {
        clickablesBox.innerHTML += '<img id="michael3" class="clickable" src="images/michael-idle-2.gif" alt="Michael 3" style="top: 180px; left: 260px; height: 95%;">';
    }

    function populateJoe1() {
        clickablesBox.innerHTML += '<img id="joe1" class="clickable" src="images/joe-idle.gif" alt="Joe 1" style="top: 180px; left: 460px; height: 65%;">';
    }

    function populateJoe2() {
        clickablesBox.innerHTML += '<img id="joe2" class="clickable" src="images/joe-idle.gif" alt="Joe 2" style="top: 150px; left: 55px; height: 100%; transform: scaleX(-1);">';
    }
    function populateJoe3() {
        clickablesBox.innerHTML += '<img id="joe3" class="clickable" src="images/joe-idle.gif" alt="Joe 3" style="top: 150px; left: 55px; height: 65%;">';
    }

    function populateJack1() {
        clickablesBox.innerHTML += '<img id="jack1" class="clickable" src="images/jack-idle-1.gif" alt="Jack 1" style="top: 150px; left: 55px; height: 70%; ">';
    }

    function populateJack2() {
        clickablesBox.innerHTML += '<img id="jack2" class="clickable" src="images/jack-idle-1.gif" alt="Jack 2" style="top: 150px; left: 155px; height: 70%; ">';
    }

    function populateJack3() {
        clickablesBox.innerHTML += '<img id="jack3" class="clickable" src="images/jack-idle-1.gif" alt="Jack 3" style="top: 160px; left: 35px; height: 70%; ">';
    }

    function populateSofia() {
        clickablesBox.innerHTML += '<img id="sofia1" class="clickable" src="images/juliet-idle-1.gif" alt="Sofia 1" style="top: 120px; left: 345px; height: 65%; ">';
    }

    function populateJack4() {
        clickablesBox.innerHTML += '<img id="jack4" class="clickable" src="images/jack-idle-1.gif" alt="Jack 4" style="top: 160px; left: 35px; height: 70%; ">';
    }


    // NAV BUTTONS
    function populateNavLeft() {
        clickablesBox.innerHTML += '<img id="nav_left" class="clickable navigation" src="images/nav_left.png" alt="Nav Left" style="top: 250px; left: 0px;">';
    }

    function populateNavRight() {
        clickablesBox.innerHTML += '<img id="nav_right" class="clickable navigation" src="images/nav_right.png" alt="Nav Right" style="top: 250px; left: 760px;">';
    }

    function populateNavToIntro3() {
        clickablesBox.innerHTML += '<img id="nav_to_intro3" class="clickable navigation" src="images/nav_up.png" alt="Nav Up" style="top: 475px; left: 373px;">';
    }


    // OBJECTS
    function populateObjectOne() {
        clickablesBox.innerHTML += '<img id="object1" class="clickable" src="images/object1.png" alt="Object 1" style="top: 300px; left: 250px; height: 25%;">';
    }

    function populateIntroSign() {
        clickablesBox.innerHTML += '<img id="introSign" class="clickable" src="images/introSign.png" alt="introSign" style="top: 172px; left: 450px; height: 30%;">';
    }

    function populateFrontDoor() {
        clickablesBox.innerHTML += '<img id="frontDoor" class="clickable" src="images/frontDoor.png" alt="frontDoor" style="top: 172px; left: 308px;">';
    }

    function populateUpperElevatorButton() {
        clickablesBox.innerHTML += '<img id="upperElevatorButton" class="clickable" src="images/upperElevatorButton.png" alt="upperElevatorButton" style="top: 230px; left: 585px; height: 7.5%;">';
    }

    function populateDesk() {
        clickablesBox.innerHTML += '<img id="desk" class="clickable" src="images/desk.png" alt="desk" style="top: 355px; left: 470px;">';
    }

    function populateVendingMachine() {
        clickablesBox.innerHTML += '<img id="vendingMachine" class="clickable" src="images/vendingMachine.png" alt="vendingMachine" style="top: 152px; left: 367px;">';
    } 

    function populateSofiaTable() {
        clickablesBox.innerHTML += '<img id="sofiaTable" class="clickable" src="images/sofiaTable.png" alt="sofiaTable" style="top: 355px; left: 495px;">';
    }

    


    // ==================
    // CLICK INTERACTIONS
    // ==================
    // Event Delegation in Practice: Attach a single event listener to a parent container 
    // and handle click events based on the target element:
    clickablesBox.addEventListener('click', (event) => {
        const target = event.target;
        if (target.id === 'character1') {
            console.log('Character 1 clicked!');
            convOne();
        } else if (target.id === 'object1') {
            console.log('Object 1 clicked!');
            convObject();
        } else if (target.id === 'nav_left') {
            loadRoom('secondRoom');
            console.log('nav_left clicked!');
        } else if (target.id === 'nav_right') {
            loadRoom('startingRoom');
            console.log('nav_right clicked!');
        } else if (target.id === 'nav_to_intro3') {
            loadRoom('introRoom3');
            console.log('nav_to_intro3 clicked!');
        } else if (target.id === 'introSign') {
            narrIntro();
            console.log('introSign clicked!');
        } else if (target.id === 'frontDoor') {
            loadRoom('upperLobby');
            console.log('frontDoor clicked!');
        } else if (target.id === 'michael1') {
            convMichaelOne();
            console.log('michael1 clicked!');
        } else if (target.id === 'michael2') {
            convMichaelTwo();
            console.log('michael2 clicked!');          
        } else if (target.id === 'upperElevatorButton') {
            if (michaelTalkedTo == true) {
                convElevatorMichaelYes();
            } else {
                convElevatorMichaelNo();
            }
            console.log('upperElevatorButton clicked!');
        } else if (target.id === 'desk') {
            convDesk();
            console.log('upperElevatorButton clicked!');
        } else if (target.id === 'joe1') {
            convPersonnel();
            console.log('joe1 clicked!');
        } else if (target.id === 'joe2') {
            convHeresYourDesk();
            console.log('joe2 clicked!');
        } else if (target.id === 'jack1') {
            convJackOne();
        } else if (target.id === 'vendingMachine') {
            convVendingMachine();
        } else if (target.id === 'jack2') {
            convJackTwo();
        } else if (target.id === 'jack3') {
            convJackThree();
        } else if (target.id === 'sofia1') {
            convSofiaOne();
        } else if (target.id === 'sofiaTable') {
            convSofiaTable();
        } else if (target.id === 'jack4') {
            convJackFour();
        } else if (target.id === 'joe3') {
            convEnd();
            console.log('joe3 clicked!');
        } else if (target.id === 'michael3') {
            convEnd();
            console.log('michael3 clicked!');
        }
        
    });


    // ==================
    // INVENTORY SYSTEM
    // ==================

    // Inventory button
    document.getElementById('itemsName').addEventListener('click', () => {
        showInventory();
    });


    document.getElementById("inventory").style.transition = "all 0.5s";

    function showInventory() {
        if (inventoryBox.classList.contains('active')) {
            inventoryBox.classList.remove('active');
        } else {
            inventoryBox.classList.add('active');
        }
    }


    function addToInventory(itemKey) {
        const item = items[itemKey];
        if (!item) {
            console.error(`Item "${itemKey}" not found.`);
            return;
        }

        // Check if the item is already in the inventory
        if (!inventory.includes(itemKey)) {
            inventory.push(itemKey);
            // Make new item element
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';
            itemElement.setAttribute('data-key', itemKey); // Set data attribute for identification
            itemElement.innerHTML = `<img src="${item.src}" alt="${item.name}">`;
        
            // Event listener for clicking inventory items.
            // Add individual descriptions of each new inventory item here.
            itemElement.addEventListener('click', () => {
                console.log(`Inspecting ${item.name}`);
                // Trigger some other function like inspectItem(itemKey); if need to break it down
                if (item.name == 'Traffic Cone') {
                    showDialogue(["Well, it sure is a traffic cone."]);
                }
            });
        
            inventoryItemsContainer.appendChild(itemElement);
            console.log(`Added ${item.name} to inventory.`);
        }
    }

    // Test function to add to inventory
    document.getElementById('inventory-button').addEventListener('click', () => {
        addToInventory('object1');
        console.log('object1 added to inventory!');
        console.log(`Inventory contents: ${inventory}`);
    });


    // Function to remove an item from the inventory
    function removeFromInventory(itemKey) {
        // Remove from inventory array
        const index = inventory.indexOf(itemKey);
        if (index > -1) {
            inventory.splice(index, 1);
        }

        // Remove item from DOM
        const itemElement = document.querySelector(`#inventoryItems .inventory-item[data-key="${itemKey}"]`);
        if (itemElement) {
            itemElement.remove();
        }
    }


    // ==================
    // UTILITIES
    // ==================

    // A quick fade-to-black transition function.
    function fadeToBlack(callback) {
        overlay.classList.add('active');
    
        // Listen for the transition to end
        overlay.addEventListener('transitionend', function handler() {
            // Remove the event listener to avoid multiple triggers
            overlay.removeEventListener('transitionend', handler);
            if (callback) callback();
        }, { once: true }); // This makes sure it runs only once
    }
    // The reverse: a fade-in-from-black transition.
    function fadeFromBlack() {
        const overlay = document.getElementById('fade-overlay');
        overlay.classList.remove('active');
    }

    // Shorthand functions for activating and deactivating clickblocker layer below dialogueBox layer
    function clickBlockerOn() {
        clickBlockerDiv.innerHTML = '<img id="clickBlockerImg" src="images/black.png" alt="clickBlockerImg">';
    }

    function clickBlockerOff() {
        clickBlockerDiv.innerHTML = '';
    }


    function changeBackground(newBackgroundSource) {
        document.getElementById('background').src = newBackgroundSource;
    }
    // Example usage:
    // changeBackground('background2.jpg');


    // TEST BUTTON
    // Test function to add to inventory
    document.getElementById('test-button').addEventListener('click', () => {
        // Example of using the function
        
        playCutscene('logoVid');
        
        
        
    });



    // ==================
    // VIDEO PLAYER
    // ==================

    function playCutscene(videoName) {
        fadeToBlack(() => {
            const videoPlayer = document.getElementById('videoPlayer');
            if (!videoPlayer) {
                console.error('Video player not found in the DOM');
                return;
            }
    
            // Create a video element
            const video = document.createElement('video');
            video.src = `images/${videoName}.mp4`;
            video.setAttribute('autoplay', true);
            video.onended = () => {
                fadeToBlack(() => { // Fade to black again after the video ends
                    videoPlayer.style.display = 'none'; // Hide video player
                    videoPlayer.innerHTML = ''; // Clean up the DOM
                    fadeFromBlack(); // Fade back in from black for post-video content
                    console.log(`${videoName} cutscene ended.`);
                });
            };
    
            // Display the video player and fade in from black to the video
            videoPlayer.style.display = 'block';
            videoPlayer.innerHTML = ''; // Ensure no previous video/elements remain
            videoPlayer.appendChild(video);
    
            fadeFromBlack(); // Fade from black once the video player is visible
        });
    }
    
    





    // ==================
    // DIALOGUE SYSTEM
    // ==================
    document.getElementById("dialogue").style.transition = "all 0.5s";
    
    function showDialogue(messages, onComplete) {
        if (typeof messages === 'string') {
            messages = [messages];
        }
    
        let currentMessageIndex = 0;
        let inBranchingDialogue = false;
    
        dialogueBox.style.display = 'block';
        dialogueBox.classList.add('active');
        clickBlockerOn();
    
        function proceedToNextMessage() {
            currentMessageIndex++;
            if (currentMessageIndex < messages.length) {
                displayCurrentMessage();
            } else {
                completeDialogue(onComplete);
            }
        }
    
        function displayCurrentMessage() {
            const message = messages[currentMessageIndex];
        
            // Reset content for current message
            dialogueText.innerHTML = '';
            dialogueOptions.style.display = 'none'; 
            dialogueNextButton.style.display = 'none'; // Hide the next button initially
        
            // Handle both message strings and objects
            if (typeof message === 'object') {
                const { text, name } = message;
                if (name) {
                    // Add name card if name is present
                    const nameCard = `<h3 class="npc-name">${name}</h3><br>`;
                    dialogueText.innerHTML = nameCard + text; // Concatenate name card with message text
                } else {
                    dialogueText.textContent = text; // Display plain text
                }
        
                // Check for options
                if (message.options && Array.isArray(message.options) && message.options.length > 0) {
                    displayOptions(message.text, message.options);
                    return; // Exit function here, don't show Next button if options are present
                }
            } else {
                dialogueText.textContent = message; // Regular string message
            }
        
            // If there's no options, then show the Next button
            dialogueNextButton.style.display = 'block'; 
        }
    
        function displayOptions(text, options) {
            dialogueText.textContent = text; // Set the text for the options
            dialogueOptions.style.display = 'block';
        
            // Clear previous options
            dialogueOptions.innerHTML = ''; // Make sure to clear existing buttons
        
            options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option.text;
                button.onclick = () => {
                    inBranchingDialogue = true;
                    dialogueBox.classList.remove('active');
                    option.onSelect(); // Invoke the associated function
                };
                dialogueOptions.appendChild(button);
            });
        }
    
        function completeDialogue(callback) {
            if (inBranchingDialogue) return; // Prevent closing if branching to another dialogue
    
            dialogueBox.classList.remove('active');
            dialogueNextButton.style.display = 'none';
            dialogueOptions.style.display = 'none';
    
            setTimeout(() => {
                clickBlockerOff();
                dialogueText.innerHTML = '';
                if (callback) {
                    callback();
                }
            }, 500);
        }
    
        dialogueNextButton.onclick = proceedToNextMessage; // Handle advancing through dialogue
    
        displayCurrentMessage(); // Display the first message
    }

   
    // old thoughts
        // Could ultimately change this to wait for click in game-container, 
        // then run function "advanceDialogue",
        // which would display next line of dialogue or remove 'active' class if no next line.
        // (But the updated version is more robust than that method)
    

    // ==================
    // END OF DIALOGUE SYSTEM
    // ==================




    // ==================
    // CONVERSATIONS
    // ==================

    
    function convOne() {
        const dialogue = [
            { text: "Hello there!", name: "NPC" }, // NPC message
            "You are now presented with a choice. What would you like to do?"
        ];
    
        // Default options
        const options = [
            { 
                text: "Option 1", 
                onSelect: () => {
                    showDialogue([
                        { text: "Option 1 was selected. You go down a unique path.", name: "NPC" },
                        "Further dialogue based on choice 1."
                    ], () => console.log('Finished option 1 path.'));
                }
            },
            { 
                text: "Option 2", 
                onSelect: () => {
                    showDialogue([
                        { text: "Option 2 was taken. A different route.", name: "NPC" },
                        "Further dialogue based on choice 2."
                    ], () => console.log('Finished option 2 path.'));
                }
            }
        ];
    
        // Check inventory for specific items
        if (inventory.includes('object1')) {
            options.push({
                text: "Secret Option with Object1",
                onSelect: () => {
                    showDialogue([
                        { text: "You have object1! This unlocks a secret pathway.", name: "NPC" },
                        "Exploring this new path..."
                    ], () => {
                        console.log('Finished secret path with object1.');
                        removeFromInventory('object1');
                        coneGiven = true;
                    });
                }
            });
        }
    
        // Add options to dialogue by referencing an array of options
        dialogue.push({
            text: "What would you like to do?",
            options: options
        });
    
        // Start the dialogue
        showDialogue(dialogue, () => console.log('Main Dialogue complete.'));
    }


    function convObject() {
        showDialogue([
            "This is a mysterious object. What could it be used for?", 
            {
                text: "Take it and try to find out?",
                options: [
                    {
                        text: "Yeah",
                        onSelect: () => {
                            showDialogue(["You got it, boss."]);
                            addToInventory('object1');
                            const objectElement = document.getElementById('object1');
                        if (objectElement) {
                            objectElement.remove(); // Remove the specific object element
                            console.log('object1 added to inventory and removed from the scene!');
                        } else {
                            console.log('object1 could not be found in the scene.');
                        }

                        }
                    },
                    {
                        text: "Nah",
                        onSelect: () => {
                            showDialogue(["Yeah, probably best not to mess with it."]);
                        }
                    }
                ]
            }
        ], () => console.log('Object Dialogue complete.'));
    }


    // NARRATION: INTRO
    function narrIntro() {
        showDialogue([
            "You find yourself at a gate guarding a small building.", 
            "It’s vaguely industrial, yet somehow clandestine, tucked away as it is at the end of an average residential street.",
            "The grass on its too-long lawn is greener and straighter than that of the nearby homes.  This, combined with the warning signs plastering its chain-link fence, creates a dissonance that screams “you aren’t supposed to be here” to anyone passing by.",
            "But you’re not passing by.",
            "You ARE supposed to be here.",
            "You push open the gate, its chain rattling to the side, and step through."
        ], () => loadRoom('introRoom2'));
        
    }

    // CONVO: convMichaelOne
    function convMichaelOne() {
        const dialogue = [
            { text: "Well, hey there!", name: "MICHAEL" }, // NPC message
            { text: "Name's Michael.  Sanitation Engineer.", name: "MICHAEL" },
            { text: "Heard we were getting a new hire today.  Doesn't happen often!", name: "MICHAEL" }
        ];
    
        // Default options
        const options = [
            { 
                text: "'Big day?'", 
                onSelect: () => {
                    showDialogue([
                        { text: "I'll say.", name: "MICHAEL" },
                        { text: "Well, why don't you get on down there?", name: "MICHAEL" }
                    ], () => console.log('Finished option 1 path.'));
                    michaelTalkedTo = true;
                }
            },
            { 
                text: "'Big day.'", 
                onSelect: () => {
                    showDialogue([
                        { text: "I'll say.", name: "MICHAEL" },
                        { text: "Well, why don't you get on down there?", name: "MICHAEL" }
                    ], () => console.log('Finished option 2 path.'));
                    michaelTalkedTo = true;
                }
            }
        ];
    
        // Check inventory for specific items
        if (inventory.includes('object1')) {
            options.push({
                text: "Secret Option with Object1",
                onSelect: () => {
                    showDialogue([
                        { text: "You have object1! This unlocks a secret pathway.", name: "MICHAEL" },
                        "Exploring this new path..."
                    ], () => {
                        console.log('Finished secret path with object1.');
                        removeFromInventory('object1');
                        coneGiven = true;
                    });
                }
            });
        }
    
        // Add options to dialogue by referencing an array of options
        dialogue.push({
            text: "",
            options: options
        });
    
        // Start the dialogue
        showDialogue(dialogue, () => console.log('convMichaelOne complete.'));
    }

    // CONVO: convElevatorMichaelYes
    function convElevatorMichaelYes() {
        showDialogue([
            "You hit the elevator button.",
            { text: "I'll head on down, too.  About done up here.", name: "MICHAEL" },
            "You both get in the elevator.",
            "As it descends, a small screen in its console flickers to life."
            
        ], () => elevatorToLowerLobby());
    }


    // CONVO: convElevatorMichaelNo
    function convElevatorMichaelNo() {
        showDialogue([
            "You hit the elevator button.",
            "The man you've been ignoring pipes up.",
            { text: "Well, hey there!", name: "MICHAEL" }, // NPC message
            { text: "Name's Michael.  Sanitation Engineer.", name: "MICHAEL" },
            { text: "Heard we were getting a new hire today.  Doesn't happen often!", name: "MICHAEL" },
            { text: "I'll head on down, too.  About done up here.", name: "MICHAEL" },
            "You both get in the elevator.",
            "As it descends, a small screen in its console flickers to life."
            
        ], () => elevatorToLowerLobby());
    }

    function elevatorToLowerLobby() {
        playCutscene('elevatorVid');
        loadRoom('lowerLobby');
    }

    // CONVO: convMichaelTwo
    function convMichaelTwo() {
        const dialogue = [
            { text: "I'm sure someone'll be by to give you a more formal welcome.", name: "MICHAEL" },
            { text: "Why not look around while you wait?", name: "MICHAEL" }
        ];
    
        // Default options
        const options = [
            { 
                text: "'I'll do that.'", 
                onSelect: () => {
                    showDialogue([
                        { text: "Let me know if you got any questions about anything.", name: "MICHAEL" }
                    ], () => console.log('Finished convMichaelTwo.'));
                    
                }
            }
        ];
    
        // Check inventory for specific items
        if (deskChecked == true) {
            options.push({
                text: "'What's with the desk?'",
                onSelect: () => {
                    showDialogue([
                        "He looks over at it."
                    ], () => {
                        console.log('Finished desk path.');
                        playCutscene('deskVid');
                        populateJoe1();
                    });
                }
            });
        }
    
        // Add options to dialogue by referencing an array of options
        dialogue.push({
            text: "",
            options: options
        });
    
        // Start the dialogue
        showDialogue(dialogue, () => console.log('convMichaelTwo complete.'));
    }

    function convUpperElevator() {
        showDialogue([
            "You click the elevator button.",
            "Nothing happens." 
            
        ], () => console.log('convUpperElevator complete.'));
        
    }

    // FUNCTION: convDesk()
    function convDesk() {
        showDialogue([
            "It's a large reception desk.",
            "There's an embossed namecard on it.",
            "...an embossed namecard that simply reads 'DESK' in authoritative letters."
            
        ], () => console.log('convUpperElevator complete.'));
        deskChecked = true;
        
    }

    function convPersonnel() {
        playCutscene('personnelVid');
        loadRoom('officeWide');
    }

    function convHeresYourDesk() {
        playCutscene('officeVid');
        loadRoom('officeVending');
    }


    function convJackOne() {
        const dialogue = [
            { text: "Hey there!  It's great to meet you.", name: "JACK" },
            { text: "I'm the CEO of this fine establishment.", name: "JACK" },
            { text: "Obviously, that stands for Chief Engineering Officer.", name: "JACK" },
            { text: "Anyway, the first stop on this tour WOULD be the cafeteria, but that's closed today due to...  Well, I'm not exactly sure, to be honest.", name: "JACK" },
            { text: "So, you get to see the vending machine instead!", name: "JACK" },
            { text: "Maybe grab yourself a snack or something, or hit me with anything you want to ask.", name: "JACK" },
            { text: "I know this place can be a lot!", name: "JACK" }
        ];
    
        // Default options
        const options = [
            { 
                text: "'...Uh, what was that door?'", 
                onSelect: () => {
                    showDialogue([
                        { text: "I'm glad you asked!", name: "JACK" },
                        { text: "That's the Wrong Door.", name: "JACK" },
                        { text: "Nobody needs to go in there, and it's locked anyway, so we just put that sign up to help people out.", name: "JACK" },
                        { text: "I used to wonder what was behind it, but eventually I decided it was more compelling to not know.  Could be anything, that way!", name: "JACK" },
                        { text: "Besides, there are all kinds of other doors you'll come across but never go through.", name: "JACK" },
                        { text: "...How does that make you feel?", name: "JACK" }
                    ], () => console.log('Finished convJackOne.'));
                    
                }
            }
        ];
    
        // Check for vending machine interaction
        if (inventory.includes('sodaCan')) {
            options.push({
                text: "'Shall we move on?'",
                onSelect: () => {
                    showDialogue([
                        "Jack perks up.",
                        { text: "Yeah!  Let's head downstairs.  I've got a stop to make, and something cool to show you.", name: "JACK" },
                        { text: "...And then something even COOLER to show you, if the stop pans out.", name: "JACK" }
                    ], () => {
                        console.log('Finished moveAlong path.');
                        loadRoom('hallway');
                    });
                }
            });
        }
    
        // Add options to dialogue by referencing an array of options
        dialogue.push({
            text: "",
            options: options
        });
    
        // Start the dialogue
        showDialogue(dialogue, () => console.log('convJackOne complete.'));
    }


    // NARRATION: Vending Machine
    function convVendingMachine() {
        if (!inventory.includes('sodaCan')) {
            showDialogue([
                "You amble over to the vending machine and take a look at the selection.", 
                "You quickly realize that the original prices have been hastily crossed out, and then increased.",
                "Presumably, this has to do with the cafeteria being closed.",
                "You realize something else: that some disgruntled employee has soldered the coin slot shut.",
                "...Looks like the market decided.",
                "You give the side of the machine a begrudging thud, and unexpectedly, a can of soda comes clattering out of the chute.",
                "You put the can in your bag, and decide to check back in with Jack."
            ], () => addToInventory('sodaCan'));
        } else {
            showDialogue([
                "You're pretty sure you've gotten everything you're going to get out of here.",
                "Better check with Jack." 
            ], () => console.log('Vending Machine complete.'));
        }
    }

    // CONVERSATION: convJackTwo
    function convJackTwo() {
        showDialogue([
            "After heading down a stairwell, the two of you stop in a musty basement hallway.",
            { text: "Time to introduce you to our Inventioneer!", name: "JACK" }, // NPC message
            { text: "She's actually a plain old mechanical engineer.", name: "JACK" },
            { text: "...And an electrical engineer.", name: "JACK" },
            { text: "Probably a few other types, too.", name: "JACK" },
            { text: "But that's not NEARLY quirky enough, so we call her the Inventioneer.", name: "JACK" },
            { text: "And then we usually duck.", name: "JACK" },
            "Rubbing his palms together excitedly, Jack pushes open the heavy steel door."
            
        ], () => loadRoom('sofiaWorkshop'));
    }

    // CONVERSATION: convJackThree
    function convJackThree() {
        showDialogue([
            "Jack peers over Sofia's shoulder excitedly.",
            { text: "Is it ready yet?", name: "JACK" }, // NPC message
            { text: "...And what's that on the side table?", name: "JACK" }
            
        ], () => console.log("convJackThree complete."));
    }

    // CONVO: convSofiaOne
    function convSofiaOne() {
        const dialogue = [
            { text: "I see our Social Engineer has a new crony.", name: "SOFIA" },
            "Jack waves his hands around frantically, trying to distract Sofia.",
            { text: "...Don't tell me he said he was the CEO again?", name: "SOFIA" },
            "Jack nods, looking slightly embarrassed.",
            { text: "Well, whatever the case, I'm just putting a couple of final tweaks on his request.", name: "SOFIA" },
            { text: "Occupy yourselves for a minute.", name: "SOFIA" }
        ];
    
        // Default options
        const options = [
            { 
                text: "'Sure thing.'", 
                onSelect: () => {
                    showDialogue([
                        { text: "Don't break anything.", name: "SOFIA" }
                    ], () => console.log('Finished convSofiaOne.'));
                    
                }
            }
        ];
    
        // Check inventory for specific items
        if (sofiaTableChecked == true) {
            options.push({
                text: "'What's that glove do?'",
                onSelect: () => {
                    
                    showDialogue([
                        "She looks up."
                    ], () => {
                        playCutscene('workshopVid');
                        convSofiaTwo();
                        
                    });
                }
            });
        }
    
        // Add options to dialogue by referencing an array of options
        dialogue.push({
            text: "",
            options: options
        });
    
        // Start the dialogue
        showDialogue(dialogue, () => console.log('convMichaelTwo complete.'));
    }


    // NARRATION: convSofiaTable
    function convSofiaTable() {
        showDialogue([
            "You take a closer look at the side table.",
            "A strange glove sits on it.",
            { text: "I've asked Sofia a lot of things, but I've never asked about that, somehow.", name: "JACK" }, // NPC message
            { text: "...You should do it.", name: "JACK" }
            
        ], () => sofiaTableChecked = true);
    }


    function convSofiaTwo() {
        const dialogue = [
            { text: "...", name: "SOFIA" }
        ];
    
        // Default options
        const options = [
            { 
                text: "'I'm sure a lot of other people are excited for it to hit stores!'", 
                onSelect: () => {
                    showDialogue([
                        { text: "Funny you say that...", name: "SOFIA" },
                        { text: "I pitched it to the board, went in all cocky, thinking it was going to be our newest product for sure, but...", name: "SOFIA" },
                        { text: "They said it wouldn't sell.", name: "SOFIA" },
                        { text: "I couldn’t believe it.  'Market was too small,' they explained helpfully.", name: "SOFIA" },
                        { text: "And they can say that, you know?  They’re writing the checks.", name: "SOFIA" },
                        { text: "So I stewed for a while, and I can’t really tell if… I don’t know, if I’ve cooled off or I’m still simmering, I guess.", name: "SOFIA" },
                        { text: "But the thing I can say is that I got a lot more willing to do one-offs when people ask.  It’s why I agreed to make Jack his soda cannon.", name: "SOFIA" },
                        { text: "THANK YOU AGAIN, BY THE WAY", name: "JACK" },
                        { text: "I assure you, I am going to launch so many sodas with this thing.", name: "JACK" },
                        "Sofia continues.",
                        { text: "I don’t think it’s going to change his life or anything - at least, I hope not - but he got really excited when I said I’d do it, and I know he’s going to be even MORE excited when he actually gets to shoot it.", name: "SOFIA" },
                        { text: "That’s tangible stuff, and it’s enough, I think. Or I tell myself.", name: "SOFIA" },
                        { text: "Just… if he hits someone, don’t let him say WE fired it.", name: "SOFIA" },
                        "She hands you the PVC-pipe cannon, Jack looking on enviously, and waves you off.",
                        "Jack wastes no time, leading you back out into the hallway, into another stairwell, and down what must be at least six to eight flights." 

                    ], () => {
                        addToInventory('sodaCannon');
                        playCutscene('voidVid');
                        loadRoom('void');
                        
                    });
                    
                }
            },

            { 
                text: "'The company must be proud of you!'", 
                onSelect: () => {
                    showDialogue([
                        { text: "Funny you say that...", name: "SOFIA" },
                        { text: "I pitched it to the board, went in all cocky, thinking it was going to be our newest product for sure, but...", name: "SOFIA" },
                        { text: "They said it wouldn't sell.", name: "SOFIA" },
                        { text: "I couldn’t believe it.  'Market was too small,' they explained helpfully.", name: "SOFIA" },
                        { text: "And they can say that, you know?  They’re writing the checks.", name: "SOFIA" },
                        { text: "So I stewed for a while, and I can’t really tell if… I don’t know, if I’ve cooled off or I’m still simmering, I guess.", name: "SOFIA" },
                        { text: "But the thing I can say is that I got a lot more willing to do one-offs when people ask.  It’s why I agreed to make Jack his soda cannon.", name: "SOFIA" },
                        { text: "THANK YOU AGAIN, BY THE WAY", name: "JACK" },
                        { text: "I assure you, I am going to launch so many sodas with this thing.", name: "JACK" },
                        "Sofia continues.",
                        { text: "I don’t think it’s going to change his life or anything - at least, I hope not - but he got really excited when I said I’d do it, and I know he’s going to be even MORE excited when he actually gets to shoot it.", name: "SOFIA" },
                        { text: "That’s tangible stuff, and it’s enough, I think. Or I tell myself.", name: "SOFIA" },
                        { text: "Just… if he hits someone, don’t let him say WE fired it.", name: "SOFIA" },
                        "She hands you the PVC-pipe cannon, Jack looking on enviously, and waves you off.",
                        "Jack wastes no time, leading you back out into the hallway, into another stairwell, and down what must be at least six to eight flights."
                    ], () => {
                        addToInventory('sodaCannon');
                        playCutscene('voidVid');
                        loadRoom('void');
                        
                    });
                    
                }
            }
        ];
    
    
        // Add options to dialogue by referencing an array of options
        dialogue.push({
            text: "",
            options: options
        });
    
        // Start the dialogue
        showDialogue(dialogue, () => console.log('convSofiaTwo complete.'));
    }


    // CONVO: convJackFour
    function convJackFour() {
        const dialogue = [
            { text: "Welcome to the Void!", name: "JACK" }
        ];
    
        // Default options
        const options = [
            { 
                text: "'...The Void?'", 
                onSelect: () => {
                    showDialogue([
                        { text: "Yeah, the Void!", name: "JACK" },
                        { text: "People love it.  Great place to think.", name: "JACK" },
                        { text: "At New Year's, we even came down here, wrote our problems on scraps of wood, and threw them in.", name: "JACK" },
                        { text: "...That was my idea, of course.", name: "JACK" },
                        { text: "As the Social Engineer, it's my job to make sure things are compelling.", name: "JACK" },
                        { text: "You know when you say you're going to put your phone down, and then fifteen minutes later you're still on it?", name: "JACK" },
                        { text: "I did that.", name: "JACK" },
                        { text: "Sorry for pulling your leg about the CEO thing, by the way.", name: "JACK" },
                        { text: "Nobody knows who the actual CEO is.", name: "JACK" },
                        { text: "Hell, maybe it's the person that does the daily pirate radio broadcast.", name: "JACK" },
                        { text: "I don't know who THEY are, either, but god, I wish I'd thought of it first.", name: "JACK" },
                        { text: "Anyway, let's launch some sodas!", name: "JACK" },
                        "You hand over the cannon.  Jack sets it up on the nearest picnic table, then looks at you expectantly.",
                        "You fish out the soda can from earlier and slot it into the chamber.",
                        "It feels super satisfying, and you can see why Jack wanted to do this so badly.",
                        "You take a few steps back.  Jack flicks a couple of switches on the cannon.",
                        "There's a loud BOOM.",
                        { text: "WOO!", name: "JACK" },
                        "...Then, there's a fainter BANG from the Void.",
                        { text: "Thaaat's never happened before.", name: "JACK" },
                        { text: "Maybe we should get back upstairs.", name: "JACK" },
                        "The two of you hustle up the stairs.  There are definitely eight flights, not six.",
                        "Wheezing, you lope past Sofia's workshop and back up to your desk."  

                    ], () => {
                        removeFromInventory('sodaCannon');
                        removeFromInventory('sodaCan');
                        loadRoom('officeWideTwo');
                        
                    });
                    
                }
            }

            
        ];
    
    
        // Add options to dialogue by referencing an array of options
        dialogue.push({
            text: "",
            options: options
        });
    
        // Start the dialogue
        showDialogue(dialogue, () => console.log('convSofiaTwo complete.'));
    }


    function convEnd() {
        showDialogue([
            "You're hit by a wave of strange smells.",
            "You quickly notice that the Wrong Door has burst open.",
            "Inside is a pile of debris - food wrappers, scraps of wood, some cigarette butts, a frisbee...",
            { text: "Hey, how did all this stuff get in this room that I've never been in?", name: "PERSONNEL ENGINEER" }, // NPC message
            "Michael sighs.",
            { text: "...I'll get to work.", name: "MICHAEL" },
            "THE END",
            "Thank you for playing Episode 1 of StereoStar Devices!"
            
        ], () => gameEnd());
    }

    function gameEnd() {
        loadRoom('endScreen');
    }



    console.log("main.js loaded!");
// CLOSING BRACKETS FOR DOMcontentLoaded event listener.  Needs to stay at the final line.
});




