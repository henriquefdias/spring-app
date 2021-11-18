package io.github.henriquefdias.clientes.model.repository;

import io.github.henriquefdias.clientes.model.entity.Servico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicoRepository extends JpaRepository<Servico, Integer> {
}
