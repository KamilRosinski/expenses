package expenses.server.persistence.entity;

import expenses.server.rest.dto.SubCategoryDTO;
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
@Table(name = "SUB_CATEGORY", uniqueConstraints = @UniqueConstraint(columnNames = {"NAME", "CATEGORY_ID"}))
@NoArgsConstructor
@Getter
public class SubCategoryEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "NAME", nullable = false)
	private String name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CATEGORY_ID")
	private CategoryEntity category;

	public SubCategoryEntity(final SubCategoryDTO dto) {
		id = dto.getId();
		name = dto.getName();
		category = new CategoryEntity(dto.getCategory());
	}

	public SubCategoryDTO mapToDto() {
		return new SubCategoryDTO(id, name, category.mapToDto());
	}

}
