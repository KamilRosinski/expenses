package expenses.server.persistence.entity;

import expenses.server.rest.dto.MonthDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "MONTH", uniqueConstraints = @UniqueConstraint(columnNames = {"YEAR", "MONTH"}))
@NoArgsConstructor
@Getter
public class MonthEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "YEAR", nullable = false)
	private Integer year;

	@Column(name = "MONTH", nullable = false)
	private Integer month;

	@OneToMany(mappedBy = "month")
	private final List<TransactionEntity> transactions = new ArrayList<>();

	@OneToMany(mappedBy = "month")
	private final List<PredictionEntity> predictions = new ArrayList<>();

	public MonthEntity(final Integer year, final Integer month) {
		this.year = year;
		this.month = month;
	}

	public MonthDTO mapToDto() {
		return new MonthDTO(
				id,
				year,
				month,
				Integer.valueOf(YearMonth.of(year.intValue(), month.intValue()).lengthOfMonth()),
				transactions.stream()
						.map(TransactionEntity::mapToDto)
						.collect(Collectors.toList()),
				predictions.stream()
						.map(PredictionEntity::mapToDTO)
						.collect(Collectors.toList())
		);
	}

}
