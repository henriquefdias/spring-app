package io.github.henriquefdias.agendaapi.model.repository;

import io.github.henriquefdias.agendaapi.model.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {

}
