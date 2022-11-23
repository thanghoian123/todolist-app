import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
TaskTask,
Task,
} from '../models';
import {TaskRepository} from '../repositories';

export class TaskTaskController {
  constructor(
    @repository(TaskRepository) protected taskRepository: TaskRepository,
  ) { }

  @get('/tasks/{id}/tasks', {
    responses: {
      '200': {
        description: 'Array of Task has many Task through TaskTask',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Task)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Task>,
  ): Promise<Task[]> {
    return this.taskRepository.tasks(id).find(filter);
  }

  @post('/tasks/{id}/tasks', {
    responses: {
      '200': {
        description: 'create a Task model instance',
        content: {'application/json': {schema: getModelSchemaRef(Task)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Task.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {
            title: 'NewTaskInTask',
            exclude: ['id'],
          }),
        },
      },
    }) task: Omit<Task, 'id'>,
  ): Promise<Task> {
    return this.taskRepository.tasks(id).create(task);
  }

  @patch('/tasks/{id}/tasks', {
    responses: {
      '200': {
        description: 'Task.Task PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {partial: true}),
        },
      },
    })
    task: Partial<Task>,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.taskRepository.tasks(id).patch(task, where);
  }

  @del('/tasks/{id}/tasks', {
    responses: {
      '200': {
        description: 'Task.Task DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.taskRepository.tasks(id).delete(where);
  }
}
