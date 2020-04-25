package expenses.server.persistence.entity;

import expenses.server.rest.dto.TransactionCreateDTO;
import expenses.server.rest.dto.TransactionDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "TRANSACTION")
@NoArgsConstructor
@Getter
public class TransactionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "DAY", nullable = false)
	private Integer day;

	@Column(name = "DESCRIPTION")
	private String description;

	@Column(name = "VALUE", nullable = false)
	private Long value;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MONTH_ID")
	private MonthEntity month;

	@ManyToOne
	@JoinColumn(name = "SUBCATEGORY_ID")
	private SubcategoryEntity subcategory;

	public TransactionEntity(final TransactionCreateDTO dto) {
		day = dto.getDay();
		description = dto.getDescription();
		value = dto.getValue();
		month = new MonthEntity(dto.getMonthId());
		subcategory = new SubcategoryEntity(dto.getSubcategory());
	}

	public TransactionDTO mapToDto() {
		return new TransactionDTO(id, day, description, value, subcategory.mapToDtoWithCategory());
	}

}
