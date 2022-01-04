package io.github.henriquefdias.clientes.model.repository;

import io.github.henriquefdias.clientes.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

}
