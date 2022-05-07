 const createCanvasFormModal = 
    `
    <div class="createCanvasFormModal">
    <div>
    <label for="project_name">Project Name</label>
    <input type="text"  id="project_name" autoComplete ="off">
    </div>
    <div>
    <label for="canvas_width">Width</label>
    <input type="number"  id="canvas_width" value="1200" autoComplete ="off">
    </div>

    <div>
    <label for="canvas_height">Height</label>
    <input type="number" value="800" id="canvas_height">
    </div>
    <div>
    <button id="createCanvasBtn" class="btn btn-primary">Create</button>
    </div>
    </div>
    `
    
    export {createCanvasFormModal}