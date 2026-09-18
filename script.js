const levels = [
    {
        id: 1,
        title: "Nivel 1: Relative hacia abajo",
        type: "relative",
        description: "Mueve al matacho 40px hacia abajo usando position relative.",
        goal: "Utiliza position relative y desplaza al personaje usando top y left con valores positivos.",
        answer: { position: "relative", top: 40, left: 0, bottom: 0, right: 0 },
        message: "¡Bien! Relative mueve el elemento desde su posición original."
    },
    {
        id: 2,
        title: "Nivel 2: Relative hacia la derecha",
        type: "relative",
        description: "Mueve al matacho 50px hacia la derecha.",
        goal: "Aplica position relative y modifica únicamente el eje horizontal hacia la derecha.",
        answer: { position: "relative", top: 0, left: 50, bottom: 0, right: 0 },
        message: "¡Correcto! Relative también puede mover el elemento horizontalmente."
    },
    {
        id: 3,
        title: "Nivel 3: Relative en dos direcciones",
        type: "relative",
        description: "Mueve el matacho 40px abajo y 50px a la derecha.",
        goal: "Combina dos coordenadas para moverte en diagonal hacia la esquina inferior derecha.",
        answer: { position: "relative", top: 40, left: 50, bottom: 0, right: 0 },
        message: "¡Excelente! Ya controlas relative en dos direcciones."
    },
    {
        id: 4,
        title: "Nivel 4: Absolute arriba izquierda",
        type: "absolute",
        description: "Coloca al matacho en la esquina superior izquierda.",
        goal: "Usa position absolute y asigna 10px desde los bordes superior e izquierdo.",
        answer: { position: "absolute", top: 10, left: 10, bottom: 0, right: 0 },
        message: "¡Correcto! Absolute permite colocar el elemento en una posición exacta."
    },
    {
        id: 5,
        title: "Nivel 5: Absolute arriba derecha",
        type: "absolute",
        description: "Lleva el matacho a la esquina superior derecha.",
        goal: "En lugar de moverte desde la izquierda, posiciona usando top y el borde derecho (right).",
        answer: { position: "absolute", top: 10, left: 0, bottom: 0, right: 10 },
        message: "¡Muy bien! Ahora usaste right con absolute."
    },
    {
        id: 6,
        title: "Nivel 6: Absolute abajo derecha",
        type: "absolute",
        description: "Lleva el matacho a la esquina inferior derecha.",
        goal: "Aplica absolute combinando las propiedades para el fondo (bottom) y el costado derecho (right).",
        answer: { position: "absolute", top: 0, left: 0, bottom: 10, right: 10 },
        message: "¡Excelente! Ya conoces las cuatro direcciones de absolute."
    },
    {
        id: 7,
        title: "Nivel 7: Fixed arriba",
        type: "fixed",
        description: "Haz que el matacho quede fijo arriba de la pantalla.",
        goal: "Usa position fixed con 80px desde arriba y 20px desde la izquierda.",
        answer: { position: "fixed", top: 80, left: 20, bottom: 0, right: 0 },
        message: "¡Correcto! Fixed mantiene el elemento respecto a la pantalla."
    },
    {
        id: 8,
        title: "Nivel 8: Fixed a la derecha",
        type: "fixed",
        description: "Coloca el matacho fijo a la derecha de la pantalla.",
        goal: "Usa position fixed controlando el eje vertical superior y el margen derecho.",
        answer: { position: "fixed", top: 150, left: 0, bottom: 0, right: 20 },
        message: "¡Muy bien! Fixed permanece fijo aunque hagamos scroll."
    },
   {
        id: 9,
        title: "Nivel 9: Sticky",
        type: "sticky",
        description: "Usa sticky con top 10px. Haz scroll dentro del escenario para verlo funcionar.",
        goal: "Usa position sticky y define un límite de 10px para la parte superior.",
        answer: { position: "sticky", top: 10, left: 0, bottom: 0, right: 0 },
        message: "¡Excelente! Sticky puede quedarse pegado al llegar al límite indicado."
    },
    {
        id: 10,
        title: "Nivel 10: Desafío final",
        type: "absolute",
        description: "Usa absolute para colocar al matacho en el centro inferior.",
        goal: "Posiciona al personaje de forma absoluta a 20px del borde inferior y 150px de la izquierda.",
        answer: { position: "absolute", top: 0, left: 150, bottom: 20, right: 0 },
        message: "¡Ganaste! Completaste los 10 niveles."
    }
];

const PLAYER_ORIGIN = { top: 100, left: 100 };

let currentLevel = 0;
let completed = false;

const player = document.getElementById("player");
const target = document.getElementById("target");
const stage = document.getElementById("stage");
const stickyArea = document.getElementById("stickyArea");
const input = document.getElementById("cssInput");
const feedback = document.getElementById("feedback");

function getNumber(value) {
    const number = parseInt(value);
    return isNaN(number) ? 0 : number;
}

function isValidSyntax(text) {
    const declarations = text.split(";").map(d => d.trim()).filter(d => d !== "");

    if (declarations.length === 0) {
        return false;
    }

    const validProperties = ["position", "top", "left", "bottom", "right"];
    const validPositionValues = ["relative", "absolute", "fixed", "sticky", "static"];

    for (const declaration of declarations) {
        const parts = declaration.split(":");

        if (parts.length !== 2) {
            return false;
        }

        const property = parts[0].trim().toLowerCase();
        const value = parts[1].trim().toLowerCase();

        if (!validProperties.includes(property)) {
            return false;
        }

        if (property === "position") {
            if (!validPositionValues.includes(value)) {
                return false;
            }
        } else {
            if (!/^-?\d+px$/.test(value)) {
                return false;
            }
        }
    }

    return true;
}

function readCSS(text) {
    const result = {
        position: "",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    };

    const declarations = text.toLowerCase().split(";");

    declarations.forEach(declaration => {
        const parts = declaration.split(":");

        if (parts.length !== 2) {
            return;
        }

        const property = parts[0].trim();
        const value = parts[1].trim();

        if (property === "position") {
            result.position = value;
        }

        if (property === "top") {
            result.top = getNumber(value);
        }

        if (property === "left") {
            result.left = getNumber(value);
        }

        if (property === "bottom") {
            result.bottom = getNumber(value);
        }

        if (property === "right") {
            result.right = getNumber(value);
        }
    });

    return result;
}

function resetEntityStyles(element) {
    element.removeAttribute("style");
}

function computeRenderPosition(css, stageEl, entityEl) {
    const stageWidth = stageEl.clientWidth;
    const stageHeight = stageEl.clientHeight;
    const entityWidth = entityEl.offsetWidth || 80;
    const entityHeight = entityEl.offsetHeight || 80;

    let top;
    let left;

    if (css.position === "relative") {
        top = PLAYER_ORIGIN.top + css.top - css.bottom;
        left = PLAYER_ORIGIN.left + css.left - css.right;
    } else {
        top = css.bottom ? (stageHeight - entityHeight - css.bottom) : css.top;
        left = css.right ? (stageWidth - entityWidth - css.right) : css.left;
    }

    return { top: top, left: left };
}

function applyCSS(css) {
    resetEntityStyles(player);

    const renderPos = computeRenderPosition(css, stage, player);

    player.style.position = "absolute";
    player.style.top = renderPos.top + "px";
    player.style.left = renderPos.left + "px";
    player.style.bottom = "auto";
    player.style.right = "auto";

    updateCoordinates();
}

function placeTarget(level) {
    resetEntityStyles(target);

    const renderPos = computeRenderPosition(level.answer, stage, target);

    target.style.position = "absolute";
    target.style.top = renderPos.top + "px";
    target.style.left = renderPos.left + "px";
}

function updateCoordinates() {
    const rect = player.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();

    const x = Math.round(rect.left - stageRect.left + stage.scrollLeft);
    const y = Math.round(rect.top - stageRect.top + stage.scrollTop);

    document.getElementById("coordinates").textContent =
        "X: " + x + "px, Y: " + y + "px";
}

function isCorrect(css, answer) {
    return css.position === answer.position &&
        css.top === answer.top &&
        css.left === answer.left &&
        css.bottom === answer.bottom &&
        css.right === answer.right;
}

function loadLevel(number) {
    const level = levels[number];
    currentLevel = number;
    completed = false;

    document.getElementById("levelNumber").textContent = level.id;
    document.getElementById("progress").style.width =
        (level.id * 10) + "%";

    document.getElementById("levelBadge").textContent =
        "Nivel " + level.id;

    document.getElementById("levelTitle").textContent = level.title;
    document.getElementById("levelDescription").textContent =
        level.description;
    document.getElementById("levelGoal").textContent = level.goal;

    input.value = "";
    feedback.textContent =
        "Escribe el código y presiona Probar Código.";
    feedback.style.color = "#94a3b8";

    if (level.type === "sticky") {
        stage.style.height = "390px";
        stickyArea.style.display = "block";
        stickyArea.style.height = "900px";
    } else {
        stickyArea.style.display = "none";
        stickyArea.style.height = "0";
    }

    document.getElementById("previousButton").disabled = number === 0;
    document.getElementById("nextButton").disabled = true;

    stage.scrollTop = 0;
    stage.scrollLeft = 0;

    placeTarget(level);

    applyCSS({ position: "absolute", top: PLAYER_ORIGIN.top, left: PLAYER_ORIGIN.left, bottom: 0, right: 0 });
}

document.getElementById("testButton").addEventListener("click", function() {
    const code = input.value.trim();

    if (code === "") {
        feedback.textContent = "❌ Escribe algún código CSS.";
        feedback.style.color = "#fb7185";
        return;
    }

    if (!isValidSyntax(code)) {
        feedback.textContent = "❌ Esa no es la sintaxis correcta. Usa el formato propiedad: valor; (ejemplo: position: absolute; top: 10px;).";
        feedback.style.color = "#fb7185";
        return;
    }

    const css = readCSS(code);
    applyCSS(css);

    const level = levels[currentLevel];

    if (isCorrect(css, level.answer)) {
        completed = true;
        feedback.textContent = "✅ " + level.message;
        feedback.style.color = "#34d399";
        document.getElementById("nextButton").disabled = false;
    } else {
        feedback.textContent =
            "⚠️ El personaje se movió, pero la posición no es la que pide el nivel.";
        feedback.style.color = "#fbbf24";
    }
});

document.getElementById("resetButton").addEventListener("click", function() {
    loadLevel(currentLevel);
});

document.getElementById("previousButton").addEventListener("click", function() {
    if (currentLevel > 0) {
        loadLevel(currentLevel - 1);
    }
});

document.getElementById("nextButton").addEventListener("click", function() {
    if (!completed) {
        return;
    }

    if (currentLevel < levels.length - 1) {
        loadLevel(currentLevel + 1);
    } else {
        document.getElementById("winModal").classList.remove("hidden");
    }
});

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("testButton").click();
    }
});

stage.addEventListener("scroll", updateCoordinates);

document.getElementById("playAgain").addEventListener("click", function() {
    document.getElementById("winModal").classList.add("hidden");
    loadLevel(0);
});

loadLevel(0);