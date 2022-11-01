package toDoList.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import toDoList.demo.dto.ResponseDTO;
import toDoList.demo.dto.TodoDTO;
import toDoList.demo.model.Todo;
import toDoList.demo.service.TodoService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("todo")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @PostMapping
    public ResponseEntity<?> createTodo(
            @AuthenticationPrincipal String userId,
            @RequestBody TodoDTO dto){
        try{
            // Convert to Entity
            Todo entity = TodoDTO.toEntity(dto);

            entity.setId(null);
            entity.setUserId(userId);

            List<Todo> entities = todoService.create(entity);

            List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
            ResponseDTO<TodoDTO> responseDTO = ResponseDTO.<TodoDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(responseDTO);
        }
        catch (Exception e){
            String error = e.getMessage();
            ResponseDTO<TodoDTO> responseDTO = ResponseDTO.<TodoDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping
    public ResponseEntity<?> retrieveTodoList(  @AuthenticationPrincipal String userId){

        List<Todo> entities = todoService.retrieve(userId);

        List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).toList();
        ResponseDTO<TodoDTO> responseDTO = ResponseDTO.<TodoDTO>builder().data(dtos).build();

        return ResponseEntity.ok().body(responseDTO);
    }

    @PutMapping
    public ResponseEntity<?> updateTodo(@AuthenticationPrincipal String userId, @RequestBody TodoDTO dto){

        Todo entity = TodoDTO.toEntity(dto);
        entity.setUserId(userId);

        List<Todo> entities = todoService.update(entity);
        List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).toList();

        ResponseDTO<TodoDTO> responseDTO = ResponseDTO.<TodoDTO>builder().data(dtos).build();

        return ResponseEntity.ok().body(responseDTO);

    }

    @DeleteMapping
    public ResponseEntity<?> deleteTodo(@AuthenticationPrincipal String userId, @RequestBody TodoDTO dto) {
        try {
            Todo entity = TodoDTO.toEntity(dto);
            entity.setUserId(userId);

            List<Todo> entities = todoService.delete(entity);

            List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).toList();
            ResponseDTO<TodoDTO> responseDTO = ResponseDTO.<TodoDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(responseDTO);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<TodoDTO> responseDTO = ResponseDTO.<TodoDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(responseDTO);


        }
    }
}
