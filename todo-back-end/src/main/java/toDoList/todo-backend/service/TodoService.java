package toDoList.demo.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import toDoList.demo.model.Todo;
import toDoList.demo.repository.TodoRepository;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    private void validate(final Todo entity){

        if(entity == null){
            log.warn("Entity cannot be null");
            throw new RuntimeException("Entity cannot be null.");
        }

        if(entity.getUserId() == null){
            log.warn("Unknown user.");
            throw new RuntimeException("Unknown user.");

        }
    }
    public List<Todo> create(final Todo entity){

        //validation
        validate(entity);
        // save entity.
        todoRepository.save(entity);
        log.info("Entity Id : {} is saved.", entity.getId());

        return todoRepository.findByUserId(entity.getUserId());
    }
    public List<Todo> retrieve(final String userId){
        return todoRepository.findByUserId(userId);
    }

    public List<Todo> update(final Todo entity){
        validate(entity);

        final Optional<Todo> origin =todoRepository.findById(entity.getId());
        origin.ifPresent(todo -> {
            todo.setTitle(entity.getTitle());
            todo.setDone(entity.isDone());

            todoRepository.save(todo);
        });

        return retrieve(entity.getUserId());
    }

    public List<Todo> delete(final Todo entity){
        validate(entity);

        try{
            todoRepository.delete(entity);
        }
        catch (Exception e){
            log.error("error deleting entity", entity.getId(), e);
            throw new RuntimeException("error deleting entity" + entity.getId());

        }
        return retrieve(entity.getUserId());

    }
}
