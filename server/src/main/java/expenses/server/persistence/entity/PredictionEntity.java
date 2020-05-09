package expenses.server.persistence.entity;

import expenses.server.rest.dto.PredictionDTO;
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
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "PREDICTION", uniqueConstraints = @UniqueConstraint(columnNames = {"MONTH_ID", "CATEGORY_ID"}))
@NoArgsConstructor
@Getter
public class PredictionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "VALUE", nullable = false)
	private Long value;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MONTH_ID")
	private MonthEntity month;

	@ManyToOne
	@JoinColumn(name = "CATEGORY_ID")
	private CategoryEntity category;

	public PredictionEntity(final PredictionDTO prediction, final MonthEntity month) {
		id = prediction.getId();
		value = prediction.getValue();
		category = new CategoryEntity(prediction.getCategory());
		this.month = month;
	}

	public PredictionDTO mapToDTO() {
		return new PredictionDTO(id, value, category.mapToDto());
	}

}
