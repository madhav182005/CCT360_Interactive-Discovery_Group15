// CCT360 - Interactive Discovery - The Curious Case
// Multi-state interactive mystery using variables, functions, DOM changes, booleans, and conditionals.


// Investigation state variables
let laptopFound = false;
let noteFound = false;
let bagFound = false;
let pathClueFound = false;
let chosenPath = "";
let lockerOpened = false;


// Scene navigation
function showScene(sceneId) {
    document.getElementById("scene-intro").style.display = "none";
    document.getElementById("scene-room").style.display = "none";
    document.getElementById("scene-choice").style.display = "none";
    document.getElementById("scene-library").style.display = "none";
    document.getElementById("scene-cafe").style.display = "none";
    document.getElementById("scene-locker").style.display = "none";
    document.getElementById("scene-final").style.display = "none";

    document.getElementById(sceneId).style.display = "block";
    window.scrollTo(0, 0);
}


// Evidence counter
function updateEvidenceCount() {
    let evidenceCount = 0;

    if (laptopFound === true) {
        evidenceCount += 1;
    }

    if (noteFound === true) {
        evidenceCount += 1;
    }

    if (bagFound === true) {
        evidenceCount += 1;
    }

    if (pathClueFound === true) {
        evidenceCount += 1;
    }

    document.getElementById("evidence-count").innerHTML = evidenceCount;
}


// Study room progression
function checkRoomProgress() {
    if (laptopFound === true && noteFound === true && bagFound === true) {
        document.getElementById("continue-choice").disabled = false;
    }
}

function inspectLaptop() {
    if (laptopFound === false) {
        laptopFound = true;
        updateEvidenceCount();
    }

    document.getElementById("inspect-laptop").className = "clue-button found";
    document.getElementById("inspect-laptop").innerHTML = "Laptop Checked ✓";
    document.getElementById("room-message").innerHTML =
        "EVIDENCE 01: The presentation autosaved at <strong>11:47 PM</strong>. The USB was disconnected immediately after that timestamp. A reminder beside the laptop reads: <strong>'The last save time is the key.'</strong>";
    checkRoomProgress();
}

function inspectNote() {
    if (noteFound === false) {
        noteFound = true;
        updateEvidenceCount();
    }

    document.getElementById("inspect-note").className = "clue-button found";
    document.getElementById("inspect-note").innerHTML = "Sticky Note Read ✓";
    document.getElementById("room-message").innerHTML =
        "EVIDENCE 02: A sticky note under the keyboard reads: <strong>‘B17 — don’t leave valuables out.’</strong> It sounds like a locker reference.";

    checkRoomProgress();
}

function inspectBag() {
    if (bagFound === false) {
        bagFound = true;
        updateEvidenceCount();
    }

    document.getElementById("inspect-bag").className = "clue-button found";
    document.getElementById("inspect-bag").innerHTML = "Backpack Checked ✓";
    document.getElementById("room-message").innerHTML =
        "EVIDENCE 03: The backpack is untouched. Nothing else is missing. This looks less like theft and more like someone moved the drive deliberately.";
    checkRoomProgress();
}


// Branch choice
function chooseLibrary() {
    chosenPath = "library";
    showScene("scene-library");
}

function chooseCafe() {
    chosenPath = "cafe";
    showScene("scene-cafe");
}


// Library interactions
function inspectPrinter() {
    if (pathClueFound === false) {
        pathClueFound = true;
        updateEvidenceCount();
    }

    document.getElementById("inspect-printer").className = "clue-button found";
    document.getElementById("inspect-printer").innerHTML = "Printer Log Checked ✓";
    document.getElementById("library-message").innerHTML =
        "EVIDENCE 04: A print job at 11:49 PM includes the note <strong>‘B17 secured’</strong>. The locker clue is confirmed.";
    document.getElementById("library-to-locker").disabled = false;
}

function inspectLibraryDesk() {
    document.getElementById("inspect-library-desk").className = "clue-button found";
    document.getElementById("inspect-library-desk").innerHTML = "Desk Slip Checked ✓";
    document.getElementById("library-message").innerHTML =
        "The desk slip shows the lower-level lockers remain accessible overnight. You still need something that specifically confirms B17.";
}


// Cafe interactions
function inspectReceipt() {
    if (pathClueFound === false) {
        pathClueFound = true;
        updateEvidenceCount();
    }

    document.getElementById("inspect-receipt").className = "clue-button found";
    document.getElementById("inspect-receipt").innerHTML = "Receipt Checked ✓";
    document.getElementById("cafe-message").innerHTML =
        "EVIDENCE 04: On the back of the 11:42 PM receipt, someone wrote <strong>‘USB → B17’</strong>. The locker clue is confirmed.";
    document.getElementById("cafe-to-locker").disabled = false;
}

function askBarista() {
    document.getElementById("ask-barista").className = "clue-button found";
    document.getElementById("ask-barista").innerHTML = "Barista Asked ✓";
    document.getElementById("cafe-message").innerHTML =
        "The barista remembers someone from your group leaving a coffee cup and returning to the study rooms. Before leaving, they mentioned putting something important somewhere safe. The receipt might reveal where.";
}


// Locker logic
function unlockLocker() {
    let enteredCode = document.getElementById("locker-code").value;

    if (laptopFound === false || noteFound === false || pathClueFound === false) {
        document.getElementById("locker-message").innerHTML =
            "You are missing key evidence. The case should only be solvable after following the trail.";
    } else if (enteredCode.length !== 4) {
        document.getElementById("locker-message").innerHTML =
            "Please enter a four-digit code.";
    } else if (enteredCode === "1147") {
        lockerOpened = true;
        prepareFinalScene();
        showScene("scene-final");
    } else {
        document.getElementById("locker-message").innerHTML =
            "That code does not match the evidence. Think about the exact time connected to the missing drive.";
    }
}


// Final state remembers the path
function prepareFinalScene() {
    if (chosenPath === "library") {
        document.getElementById("final-path-text").innerHTML =
            "You solved the case through the <strong>library trail</strong>, using the print log to confirm Locker B17 before returning to the 11:47 timestamp.";
    } else if (chosenPath === "cafe") {
        document.getElementById("final-path-text").innerHTML =
            "You solved the case through the <strong>café trail</strong>, using the marked receipt to confirm Locker B17 before returning to the 11:47 timestamp.";
    }
}

function reviewEvidence() {
    let evidenceText = "<strong>CASE EVIDENCE SUMMARY</strong><ol>";

   if (laptopFound === true) {
        evidenceText += "<li>Laptop: 11:47 PM autosave timestamp.</li>";
    }

    if (noteFound === true) {
        evidenceText += "<li>Sticky Note: Locker B17 identified.</li>";
    }

     if (bagFound === true) {
        evidenceText += "<li>Backpack: No signs of theft were found.</li>";
    }

    if (pathClueFound === true) {
        evidenceText += "<li>Investigation Trail: Locker B17 was confirmed.</li>";
    }

    evidenceText += "</ol>";

    if (lockerOpened === true) {
        evidenceText += "<strong>Case Closed:</strong> Locker B17 was opened using code 1147. The missing USB drive was recovered.";
    }

    document.getElementById("final-evidence").innerHTML = evidenceText;
}


// Button events
document.getElementById("start-button").onclick = function() {
    showScene("scene-room");
};

document.getElementById("inspect-laptop").onclick = inspectLaptop;
document.getElementById("inspect-note").onclick = inspectNote;
document.getElementById("inspect-bag").onclick = inspectBag;

document.getElementById("continue-choice").onclick = function() {
    showScene("scene-choice");
};

document.getElementById("library-path").onclick = chooseLibrary;
document.getElementById("cafe-path").onclick = chooseCafe;

document.getElementById("inspect-printer").onclick = inspectPrinter;
document.getElementById("inspect-library-desk").onclick = inspectLibraryDesk;
document.getElementById("library-to-locker").onclick = function() {
    showScene("scene-locker");
};

document.getElementById("inspect-receipt").onclick = inspectReceipt;
document.getElementById("ask-barista").onclick = askBarista;
document.getElementById("cafe-to-locker").onclick = function() {
    showScene("scene-locker");
};

document.getElementById("unlock-button").onclick = unlockLocker;
document.getElementById("review-case").onclick = reviewEvidence;

document.getElementById("restart-button").onclick = function() {
    window.location.reload();
};
