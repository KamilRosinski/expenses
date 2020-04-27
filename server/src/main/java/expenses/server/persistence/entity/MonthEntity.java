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
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Comparator;
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
	@OrderBy("day DESC")
	private List<TransactionEntity> transactions = new ArrayList<>();

	@OneToMany(mappedBy = "month")
	private List<PredictionEntity> predictions = new ArrayList<>();

	public MonthEntity(final Integer year, final Integer month) {
		this.year = year;
		this.month = month;
	}

	public MonthDTO mapToDto() {
		final YearMonth yearMonth = YearMonth.of(year.intValue(), month.intValue());
		return new MonthDTO(
				id,
				yearMonth,
				Integer.valueOf(yearMonth.lengthOfMonth()),
				transactions.stream()
						.map(TransactionEntity::mapToDto)
						.collect(Collectors.toList()),
				predictions.stream()
						.map(PredictionEntity::mapToDTO)
						.sorted(Comparator.comparing(prediction -> prediction.getCategory().getName()))
						.collect(Collectors.toList())
		);
	}

}
