
$(document).ready(function () {
  let toDoData = JSON.parse(localStorage.getItem("toDoData")) || [];

  function renderList() {
    if (toDoData.length == 0) {
      $("#clearBtn").addClass("d-none");
    } else {
      $(".list").removeClass("d-none");
      $("#clearBtn").removeClass("d-none");
    }
  }

  function refreshList() {
    $(".list").empty(); 
    toDoData.forEach(function (item, index) {
      const listItem = `
        <div class="d-flex gap-3">
          <li class="d-flex w-100 fs-5 fw-medium">${index + 1}) ${item}</li> 
          <button class="btn del-btn " data-index="${index}"> <i class="fa-solid fa-trash"></i></button>
          <button class="btn edit-btn " data-index="${index}"><i class="fa-solid fa-pen"></i></button>
          </div>
          
      `;
      $(".list").append(listItem);
    });
    console.log(toDoData);
  }

  renderList();

  $("#addBtn").on("click", function () {
    const inputValue = $(".input").val();
    if (inputValue === "") {
      alert("Please write something");
    } else {
      toDoData.push(inputValue);
      localStorage.setItem("toDoData", JSON.stringify(toDoData));
      $(".input").val(""); 
      renderList();
      refreshList();
    }
  });

  $("#clearBtn").on("click", function () {
    toDoData = [];
    localStorage.setItem("toDoData", JSON.stringify(toDoData));
    renderList();
    refreshList();
  });
  $(document).on("click", ".del-btn", function() {
    const indexToDelete = $(this).data("index");
    deleteItem(indexToDelete);
  });

  function deleteItem(index) {
    toDoData.splice(index, 1);
    localStorage.setItem("toDoData", JSON.stringify(toDoData));
    refreshList();
  }

  $(document).on("click", ".edit-btn", function() {
    const indexToEdit = $(this).data("index");
    const textToEdit = toDoData[indexToEdit];
    
    $("#editInput").val(textToEdit);
    
    $("#editDiv").removeClass("d-none");
    
    // Düzenleme işlevini çağırmak için indexToEdit'i saklayabilirsiniz
    $("#editDiv").data("editIndex", indexToEdit);
  });
  
  $("#saveBtn").on("click", function() {
    const indexToEdit = $("#editDiv").data("editIndex");
    const editedText = $("#editInput").val();
    
    toDoData[indexToEdit] = editedText;
    localStorage.setItem("toDoData", JSON.stringify(toDoData));
    
    $("#editDiv").addClass("d-none");
    
  
    refreshList();
  });
  
  refreshList();
});


