package expenses.server.persistence.entity;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;

@Entity
@Table(name = "EXPENSE")
@Getter
public class ExpenseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Long id;

	@Column(name = "DATE", nullable = false)
	private Date date;

	@Column(name = "DESCRIPTION", nullable = false)
	private String description;

	@Column(name = "VALUE", nullable = false)
	private Integer value;

}
