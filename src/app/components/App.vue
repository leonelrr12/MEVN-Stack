<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>

    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="task.title"
                    class="form-control"
                    placeholder="Insertar Tarea"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    v-model="task.description"
                    cols="30"
                    rows="10"
                    class="form-control"
                    placeholder="Descripcion de la Tarea"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  name=""
                  id="btnUPDT"
                  class="btn btn-primary btn-lg btn-block"
                >
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
            <table class="table table-bordered">
                <thead>
                    <tr class="text-center bg-dark text-white">
                        <th>Tarea</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="task of tasks">
                        <td>{{task.title}}</td>
                        <td>{{task.description}}</td>
                        <td>
                            <button @click="editTask(task._id)" class="btn btn-warning">Editar</button>
                            <button @click="deleteTask(task._id)" class="btn btn-danger">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//*************************** */
// Esto no me funciona
//*************************** */
// class Task {
//   constructor(title, description) {
//     this.title = title;
//     this.description = description;
//   }
// }

export default {
  data() {
    return {
      task: {
          id: 0,
          title: '',
          description: ''
      },
      tasks: [],
      edit: false
    };
  },
  created() {
      this.getTasks();
  },
  methods: {
    sendTask() {
        if(this.edit === true) {
            fetch('/api/tasks/' + this.task.id, {
                method: 'put',
                body: JSON.stringify(this.task),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getTasks();       
                const btnUPDT = document.getElementById('btnUPDT')
                btnUPDT.textContent ='Guardar'   
                this.edit = false;  
            })
        } else {
            fetch('/api/tasks', {
                method: 'post',
                body: JSON.stringify(this.task),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getTasks();            
            })
        }
        this.task.title = '';
        this.task.description = '';
    },
    getTasks() {
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            this.tasks = data;
        })        
    },
    editTask(id) {      
        fetch('/api/tasks/' + id)
        .then(res => res.json())
        .then(data => {
            this.task.id = data._id;
            this.task.title = data.title;
            this.task.description = data.description;
            this.edit = true;
            const btnUPDT = document.getElementById('btnUPDT')
            btnUPDT.textContent ='Actualizar'
        })
    },
    deleteTask(id) {
        fetch('/api/tasks/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.getTasks();
        })
    }    
  }
};
</script>