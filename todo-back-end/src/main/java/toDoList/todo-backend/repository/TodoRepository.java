package toDoList.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import toDoList.demo.model.Todo;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, String> {

    @Query(value = "SELECT * FROM todo WHERE todo.user_id = :userId", nativeQuery = true)
    List<Todo> findByUserId(String userId);
}
