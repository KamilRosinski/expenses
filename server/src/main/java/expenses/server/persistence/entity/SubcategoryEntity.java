package expenses.server.persistence.entity;

import expenses.server.rest.dto.SubcategoryDTO;
import expenses.server.rest.dto.SubcategoryWithCategoryDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "SUBCATEGORY", uniqueConstraints = @UniqueConstraint(columnNames = {"NAME", "CATEGORY_ID"}))
@NoArgsConstructor
@Getter
public class SubcategoryEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "NAME", nullable = false)
	private String name;

	@ManyToOne
	@JoinColumn(name = "CATEGORY_ID")
	private CategoryEntity category;

	public SubcategoryEntity(final SubcategoryWithCategoryDTO dto, final CategoryEntity category) {
		id = dto.getId();
		name = dto.getName();
		this.category = category;
	}

	public SubcategoryWithCategoryDTO mapToDtoWithCategory() {
		return new SubcategoryWithCategoryDTO(id, name, category.mapToDto());
	}

	public SubcategoryDTO mapToDto() {
		return new SubcategoryDTO(id, name);
	}

}
